---
name: mermaid-diagram
description: src/ 디렉토리를 분석해 컴포넌트 의존성과 상태 흐름을 Mermaid 다이어그램으로 시각화한 HTML(docs/architecture/index.html)을 생성하고 브라우저로 연다. "아키텍처 시각화", "구조 다이어그램", "mermaid로 구조 그려줘", "의존성 그래프", "상태 흐름도" 요청이나 컴포넌트·상태 구조가 바뀌어 다이어그램을 갱신해야 할 때 사용한다.
---

# Mermaid 아키텍처 다이어그램

`src/`를 분석해서 Mermaid 다이어그램 HTML을 만들고 브라우저로 연다.
**가장 중요한 결과물은 컴포넌트 간 의존성 시각화**이고, 상태 흐름은 가능한 범위에서 함께 표현한다.

## 1. 분석 (추측 금지, 실제 코드 기준)

- `src/` 아래 `.ts`/`.tsx` 파일을 **모두 읽는다**. `CLAUDE.md`가 있으면 아키텍처·규칙 설명을 참고하되, 다이어그램은 실제 코드와 일치해야 한다.
- 파일마다 기록한다:
  - **import 목록**: 값 import와 타입 import를 구분
  - **export**: 컴포넌트, 훅, Provider, API 함수
  - **props interface**: 어떤 props를 받고, 그 중 어떤 것이 콜백(`onXxx`)인지
  - **상태**: `useState`, Context 값, `useEffect`의 의존성
  - **API 호출**: HTTP 메서드와 엔드포인트
- import 관계(정적 의존성)와 렌더 트리(실행 시 부모-자식 관계)는 **다를 수 있다**. 예를 들어 슬롯으로 `ReactNode`를 넘기는 경우가 그렇다. 둘을 따로 그린다.

## 2. 다이어그램 구성 (`docs/architecture/index.html`)

섹션마다 짧은 설명(1~2문장)을 붙이고, 코드에서 발견한 주의점은 다이어그램 아래 `ul.notes`에 적는다.

| #   | 섹션                   | Mermaid 타입      | 내용                                                                                                        |
| --- | ---------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | 전체 구조              | `flowchart LR`    | 저장소 → 서버 → api → 상태 → UI 레이어                                                                      |
| 2   | **모듈 의존성** (필수) | `flowchart TD`    | 파일 간 import. 값 import는 실선 `-->`, 타입 import는 점선 `-.->`. 같은 파일의 export는 `subgraph`로 묶는다 |
| 3   | 렌더 트리              | `flowchart TD`    | 실행 시 컴포넌트 계층, 슬롯은 엣지 라벨로 표시                                                              |
| 4   | 상태·Props 흐름        | `flowchart LR`    | 상태 보유자를 `subgraph`로 묶고 props는 실선, 콜백(자식→부모)은 점선                                        |
| 5   | 화면 상태 전이         | `stateDiagram-v2` | UI 상태 조합과 전이를 일으키는 이벤트                                                                       |
| 6   | 데이터 시퀀스          | `sequenceDiagram` | 초기 로드 / 생성·수정(`alt`) / 삭제 흐름                                                                    |
| 7   | 상태 계층 요약         | HTML `table`      | 계층, 위치, 상태, 전달 방식                                                                                 |

상태 관리가 없거나 단순한 프로젝트라면 4~7 중 의미 없는 섹션은 생략한다.

### 레이어 색상 (`classDef`, 모든 flowchart에서 통일)

```
classDef data  fill:#fde68a,stroke:#b45309,color:#111   %% 저장소·서버·진입점
classDef api   fill:#bfdbfe,stroke:#1d4ed8,color:#111   %% API 모듈
classDef state fill:#c7d2fe,stroke:#4338ca,color:#111   %% Context·상태 보유 컴포넌트
classDef ui    fill:#bbf7d0,stroke:#15803d,color:#111   %% UI 컴포넌트
classDef local fill:#fbcfe8,stroke:#be185d,color:#111   %% 컴포넌트 로컬 state
classDef type  fill:#e5e7eb,stroke:#6b7280,color:#111   %% 타입 모듈
```

### Mermaid 문법 주의

- 라벨에 `()`, `/`, `.`, `:`, 한글이 있으면 큰따옴표로 감싼다: `A["api/notes.ts<br/>fetch 래퍼"]`
- 노드 ID는 영문으로 하고 `end`, `Note`, `class`, `style` 같은 예약어 또는 예약어와 헷갈리는 이름은 피한다(`NoteType` 등으로 쓴다).
- 줄바꿈은 `<br/>`로 넣는다. `stateDiagram-v2`의 긴 상태명은 `state "설명" as Id`로 선언한다.

## 3. HTML 템플릿 규칙

- 한 파일에 CSS를 인라인으로 넣는다. Mermaid는 ESM CDN으로 불러온다:
  ```html
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    mermaid.initialize({
      startOnLoad: true,
      theme: dark ? 'dark' : 'default',
      securityLevel: 'loose',
      flowchart: { htmlLabels: true, curve: 'basis' },
    });
  </script>
  ```
- 다이어그램은 `<div class="diagram"><pre class="mermaid">...</pre></div>`로 감싼다. `.diagram`에는 `overflow-x: auto`를 준다.
  `<pre>` 내용은 **들여쓰기 없이 줄 맨 앞에서 시작**한다.
- 상단에 섹션 앵커 내비게이션을 둔다. 색상은 `:root` CSS 변수로 정의하고 `prefers-color-scheme: dark`를 대응한다.
- 문구는 한국어로 쓴다. 폰트는 Pretendard(CDN)를 쓴다.
- 기존 `docs/architecture/index.html`이 있으면 먼저 읽고 구조를 유지한 채 내용만 갱신한다.

## 4. 브라우저로 열기

저장한 뒤 OS 기본 브라우저로 바로 연다:

- Windows (PowerShell): `Start-Process "docs/architecture/index.html"`
- macOS: `open docs/architecture/index.html`
- Linux: `xdg-open docs/architecture/index.html`

## 5. 완료 보고

생성된 파일 경로, 포함한 다이어그램 목록, 분석 중 발견한 주의점(주석과 실제 동작이 다른 곳, 에러 처리 누락 등)을 짧게 보고한다.
