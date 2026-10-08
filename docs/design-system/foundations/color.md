# 색상

> 기준 → D-001 · 토큰 이름 → D-004 · 라이트 모드만 → D-005
> 표의 `--변수`와 값은 `src/index.css`의 `@theme`과 같아야 한다(`src/design-system.test.ts`가 검사).
> Tailwind 클래스는 `--color-` 뒤의 이름을 쓴다: `--color-primary` → `bg-primary`, `text-primary`, `ring-primary/35`.

## 규칙

- **노랑(`primary`) 위 글자는 항상 차콜(`on-primary`)**이다. 흰 글자는 금지한다. → D-007
- **호박색(`accent`)은 채움색에만** 쓰고 글자색으로 쓰지 않는다. → D-007
- 노랑은 가장 중요한 곳(저장 버튼, 선택 표시, 포커스 링)에만 쓴다. → D-008
- 컴포넌트에 `#hex`, `rgb()`, `rgba()`를 직접 쓰지 않는다. 필요한 색이 없으면 이 문서와 `@theme`에 토큰을 먼저 추가한다.

## 브랜드

| 변수                   | 값        | 용도                                         | 출처   |
| ---------------------- | --------- | -------------------------------------------- | ------ |
| `--color-primary`      | `#ffc700` | 해바라기 노랑. 저장 버튼, 선택 링, 포커스 링 | [원본] |
| `--color-on-primary`   | `#1e1e1e` | 노랑·호박 위 글자                            | [원본] |
| `--color-primary-soft` | `#fffbeb` | 크림. 빈 상태 아이콘 칩                      | [원본] |
| `--color-secondary`    | `#1e1e1e` | 차콜. 보조 강조 버튼(+ 새 노트)              | [원본] |
| `--color-on-secondary` | `#ffffff` | 차콜 위 글자                                 | [원본] |
| `--color-accent`       | `#f59e0b` | 호박. 별점·카운트 배지 채움 (예비)           | [원본] |

## 중립·표면

| 변수                       | 값                  | 용도                                  | 출처           |
| -------------------------- | ------------------- | ------------------------------------- | -------------- |
| `--color-background`       | `#f8f8f6`           | 앱 캔버스 (Level 0)                   | [원본]         |
| `--color-card`             | `#ffffff`           | 카드·패널·헤더 표면                   | [원본]         |
| `--color-foreground`       | `#1e1e1e`           | 기본 텍스트                           | [원본]         |
| `--color-muted`            | `#f1f1ef`           | 사이드바, 보조 배경                   | [파생] → D-006 |
| `--color-muted-foreground` | `#5f5e5e`           | 보조 텍스트, 날짜, placeholder(`/60`) | [원본] YAML    |
| `--color-border`           | `#e4e4e7`           | 구분선, Ghost 버튼 테두리             | [원본]         |
| `--color-hairline`         | `rgb(0 0 0 / 0.04)` | 카드 기본 테두리 (Level 1)            | [원본] → D-014 |
| `--color-hairline-strong`  | `rgb(0 0 0 / 0.06)` | 카드 hover 테두리 (Level 2)           | [원본] → D-014 |
| `--color-destructive`      | `#ba1a1a`           | 삭제·오류 텍스트                      | [원본] YAML    |

## 파스텔

태그·배지 배경. 글자는 항상 `text-foreground`.

| 변수                    | 값        | 용도             | 출처   |
| ----------------------- | --------- | ---------------- | ------ |
| `--color-pastel-yellow` | `#fef3c7` | 태그 칩 → D-012  | [원본] |
| `--color-pastel-green`  | `#dcfce7` | 긍정 배지 (예비) | [원본] |
| `--color-pastel-red`    | `#fee2e2` | 경고 배지 (예비) | [원본] |

## 명도 대비 (참고)

| 조합                              | 대비     | 판정              |
| --------------------------------- | -------- | ----------------- |
| `on-primary` / `primary`          | 약 12:1  | 통과              |
| 흰색 / `primary`                  | 1.6:1    | **금지**          |
| `muted-foreground` / `background` | 약 6:1   | 통과              |
| `destructive` / `card`            | 약 6.5:1 | 통과              |
| `accent` / `card` (글자)          | 2.1:1    | **금지** (채움만) |
