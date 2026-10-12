---
paths:
  - 'src/**/*.tsx'
  - 'src/index.css'
  - 'index.html'
  - 'docs/design-system/**'
---

# 스타일 규칙 (디자인 시스템)

스타일(className, 색, 폰트, 여백, 모서리, 그림자, UI 문구)을 바꾸기 전에 `docs/design-system/README.md`의 "이 작업이면 이 파일" 표에서
해당 문서를 찾아 읽는다. `foundations/color.md`는 항상 읽는다.

- 색·그림자는 `@theme` 토큰 클래스만 쓴다(`bg-primary`, `border-hairline`, `shadow-level-1`). `#hex`, `rgb()`, `rgba()`, `shadow-[...]` 금지.
- `style={{ ... }}` 인라인 스타일 금지. 폰트는 `font-sans`(기본), 높이는 토큰 기반(`h-16`, `h-[calc(100vh-4rem)]`).
- 노랑(`primary`) 위 글자는 항상 `text-on-primary`(차콜). 노란 Primary 버튼은 한 화면에 하나.
- 버튼·태그 칩·배지는 `rounded-full`, 카드 `rounded-lg`, 큰 패널 `rounded-2xl`.
- 글자는 타이포 토큰(`text-headline-sm`, `text-body-sm`, `text-label-md` 등)으로 지정한다. 헤드라인은 `tracking-[-0.02em]`.
- UI 문구는 해요체("이미 있는 태그예요"). 합쇼체 금지.
- 문서에 없는 스타일이 필요하면 **문서와 `@theme`을 먼저 고친다**. 토큰 행 형식 ``| `--변수` | `값` |``을 유지한다.
- 결정의 이유는 `decisions.md`(D-번호)에 있다. 이미 정한 결정을 바꾸려면 사용자에게 먼저 묻는다.
- 스타일을 바꾼 뒤 `npx vitest run src/design-system.test.ts`로 문서와 코드가 일치하는지 확인한다.
