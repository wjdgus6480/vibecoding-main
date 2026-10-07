# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 목적

React 19 + TypeScript + Vite 기반 **노트 앱 강의 실습 프로젝트**. 노트 CRUD만 있는 의도적으로 작은 코드베이스이며 강의 중 기능을 하나씩 추가한다
(예: `src/types/note.ts` 주석대로 `tags` 필드는 강의에서 추가 예정). UI 문구·주석·시드 데이터는 모두 한국어다.

## 명령어

```bash
npm run dev          # Vite(5173) + json-server(3001) 동시 실행
npm run server       # json-server만 (db.json 감시)
npm run build        # tsc 타입체크 후 vite build
npm run lint         # eslint . --fix  ← 파일을 자동 수정함
npm run format       # prettier --write .
npm test             # vitest run / npm run test:watch
npx vitest run src/components/NoteItem.test.tsx   # 단일 파일
npx vitest run -t "테스트 이름"                     # 이름으로 단일 테스트
```

- **테스트 파일은 아직 없다.** Vitest(globals, jsdom, `src/test-setup.ts`에서 jest-dom 로드)와 Testing Library만 준비됨. 테스트는 대상 옆 `*.test.tsx`.
- dev/server 실행 중 앱에서 저장하면 **`db.json`이 실제로 수정된다**. 의도치 않은 변경을 커밋하지 말 것.

## 아키텍처

```
db.json ⇄ json-server(:3001) ⇄ src/api/notes.ts ⇄ NotesContext ⇄ 컴포넌트
```

- `App.tsx`: 화면 상태(`selectedNoteId`, `isCreating`)를 가지고 `NotesProvider`로 감싼 뒤 `Layout`에 슬롯으로 `NoteList`/`NoteEditor`를 꽂는다.
- `Layout`: 헤더(+ 새 노트) + 사이드바/메인 2단. `sidebar`, `main`을 **ReactNode props(슬롯)** 로 받는다.
- `NoteList` → `NoteItem`: 목록. loading/error/빈 상태는 `NoteList`가 처리한다.
- `NoteEditor`: 생성/편집 겸용 폼. `isCreating`이면 `addNote`, 아니면 `editNote`.

## 컴포넌트 구현 규칙

- 함수 컴포넌트 + **named export** (`export function NoteList(...)`). `App`만 default export.
- Props는 컴포넌트 바로 위에 `interface XxxProps`로 선언하고 매개변수에서 구조분해한다. `React.FC`는 쓰지 않는다.
- 상태 분기는 **early return**: `loading` → `error` → 빈 목록 → 정상 렌더 순 (`NoteList`, `NoteEditor`의 미선택 화면).
- 자식은 표시 + 콜백 호출만 한다(`NoteItem`은 `onSelect`/`onDelete`만 받음). Context 접근은 `NoteList`/`NoteEditor` 같은 컨테이너에서만.
- 중첩 클릭 영역의 내부 버튼은 `e.stopPropagation()` (`NoteItem` 삭제 버튼).
- 폼 입력은 controlled(`value` + `onChange={(e) => setX(e.target.value)}`). 사용자 알림은 `alert()`.
- JSX 영역 구분 주석은 `{/* 헤더 */}`처럼 한국어로 단다.
- 스타일은 Tailwind v4 유틸리티 클래스. `tailwind.config.js` 없이 `src/index.css`의 `@theme` 토큰
  (`background`, `card`, `foreground`, `muted`, `muted-foreground`, `border`, `destructive`)을 `bg-card` 등으로 쓴다. 새 색은 `@theme`에 `--color-*` 추가.
  주 버튼 `bg-foreground text-card rounded-xl ... hover:opacity-75`, 보조 버튼 `bg-muted text-muted-foreground`.

## 상태관리 규칙

- **서버 데이터 = `NotesContext`, 화면 상태 = `App` 로컬 state(props로 전달), 폼 입력 = 컴포넌트 로컬 state** 의 3계층으로 나눈다.
  외부 상태관리·데이터 페칭·라우터 라이브러리는 쓰지 않는다.
- Context는 `createContext<XxxContextType | null>(null)` + `XxxProvider` + `useXxx()` 훅 세트로 만들고,
  훅은 Provider 밖이면 `throw new Error('useXxx must be used within XxxProvider')`. 컴포넌트는 항상 훅으로 접근한다.
- 초기 로드는 Provider 마운트 시 `useEffect`로 1회. `notes`, `loading`, `error`를 Context가 보유한다.
- 변경 함수는 **API 성공 후** 함수형 업데이트로 로컬 배열을 갱신한다(낙관적 업데이트·재조회 없음):
  추가 `[...prev, x]`, 수정 `prev.map(n => n.id === id ? updated : n)`, 삭제 `prev.filter(n => n.id !== id)`.
  Context 변경 함수는 에러를 잡지 않고 호출자에게 전파한다.
- 비동기 진행 상태는 컴포넌트 로컬 boolean(`saving`)으로 관리하고 `finally`에서 해제한다.
- `NoteEditor`의 폼 동기화 `useEffect`는 의존성을 일부러 `[selectedNoteId, isCreating]`만 둔다
  (`eslint-disable-line react-hooks/exhaustive-deps`). `notes`가 바뀔 때 입력 중인 폼이 덮어써지는 것을 막기 위해서다.

## API 호출 규칙

- 모든 HTTP 호출은 `src/api/notes.ts`에만 둔다. 컴포넌트는 api를 직접 import하지 않고, Context가 `import * as api from '../api/notes'`로 사용한다.
- 함수 1개 = 엔드포인트 1개, `export async function`, 반환 타입 명시(`Promise<Note>` 등).
- 형태: `const res = await fetch(...)` → `if (!res.ok) throw new Error('Failed to ...')` → `return res.json()`.
  본문이 있으면 `headers: { 'Content-Type': 'application/json' }` + `JSON.stringify`.
- 수정은 `PATCH`(부분 업데이트). `createdAt`/`updatedAt`은 **클라이언트가 ISO 문자열로 채운다**(json-server는 만들지 않음). `id`는 서버가 생성.
- 입력 타입은 `Note`에서 파생: 생성 `Omit<Note, 'id' | 'createdAt' | 'updatedAt'>`, 수정 `Partial<Note>`.
- `API_URL`은 `http://localhost:3001` 하드코딩(env·proxy 없음).
- 필드 추가 시 `types/note.ts` → `api/notes.ts` → `NotesContext` → 컴포넌트 → `db.json` 시드 순으로 함께 맞춘다.

## 네이밍 규칙

- 파일: 컴포넌트·Context는 PascalCase `.tsx`(`NoteEditor.tsx`, `NotesContext.tsx`), 그 외 camelCase `.ts`(`notes.ts`, `note.ts`).
- 타입: 도메인 `Note`(단수, `src/types/`), Props `XxxProps`, Context 값 `XxxContextType`.
- 이벤트 핸들러 `handleXxx`, 콜백 props `onXxx`, 선택 ID `selectedXxxId`.
- 계층별 CRUD 동사가 다르다: **API = `fetch/create/update/delete`**, **Context = `add/edit/remove`**. 새 기능도 이 구분을 따른다.

## 도구 설정

- TS `strict` + `noUnusedLocals`/`noUnusedParameters` → 미사용 변수가 있으면 build 실패.
- ESLint 9 flat config: typescript-eslint recommended + react-hooks + react-refresh(`only-export-components` 경고).
- Prettier: 작은따옴표, 세미콜론, trailing comma `all`, `printWidth` 100, 2칸 들여쓰기.

## 일관성이 없는 부분 (수정 시 주의)

기존 코드가 서로 다르게 작성된 곳이다. 새 코드는 위 규칙을 따르고, 아래를 근거로 기존 방식을 복제하지 말 것.

1. **비동기 스타일**: 대부분 `async/await`인데 `NotesContext` 초기 로드만 `.then().catch().finally()` 체인.
2. **에러 처리**: `NoteEditor` 저장은 `try/catch` + `alert`, `NoteItem` 삭제(`removeNote`)는 처리 없음 → 실패 시 unhandled rejection, 삭제 확인도 없음.
3. **에러 메시지 언어**: UI는 한국어인데 API 에러는 영어(`'Failed to fetch notes'`)이고, 그대로 `오류: Failed to fetch notes`로 사용자에게 노출된다.
4. **Boolean 네이밍**: props는 `isCreating`/`isSelected`(is- 접두사), state는 `loading`/`saving`(접두사 없음).
5. **Context 함수 시그니처**: `addNote(title, content)`는 위치 인자, `editNote(id, updates: Partial<Note>)`는 객체.
   `Partial<Note>`라 `id`/`createdAt`까지 넘길 수 있다.
6. **스타일 토큰 우회**: `Layout`이 `@theme`의 `--font-display` 대신 인라인 `style={{ fontFamily: 'Boogaloo, sans-serif' }}`를 쓰고,
   높이도 인라인 `calc(100vh - 65px)`(헤더 높이 매직넘버). 정의된 `--radius` 토큰은 쓰이지 않고 `rounded-xl/2xl/3xl`, 그림자는 `rgba` 임의값을 하드코딩.
7. **export 형태**: 컴포넌트는 선언과 함께 `export function`인데 `App`만 선언 후 파일 끝에서 `export default App`.
8. **저장 후 선택 상태**: `App.handleDone`의 주석은 "선택 상태 유지"라고 하지만, 새 노트 저장 후에는 `selectedNoteId`가 null이라
   방금 만든 노트가 선택되지 않고 빈 화면으로 돌아간다. `onDone` 하나가 저장 완료와 취소를 함께 처리한다.
