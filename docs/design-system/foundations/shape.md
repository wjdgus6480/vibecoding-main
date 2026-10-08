# 모서리 · 그림자

> 모서리 스케일 → D-011 · 테두리 토큰 → D-014
> 표의 `--변수`와 값은 `src/index.css`의 `@theme`과 같아야 한다(`src/design-system.test.ts`가 검사).

## 모서리

Tailwind 기본 클래스를 쓴다. `@theme`에서 `--radius-*`를 재정의하지 않는다.

| 원본 이름 | 값     | 클래스         | 용도                            |
| --------- | ------ | -------------- | ------------------------------- |
| sm        | 4px    | `rounded-sm`   | 체크박스 등 작은 요소           |
| DEFAULT   | 8px    | `rounded-lg`   | **카드** (NoteItem)             |
| md        | 12px   | `rounded-xl`   | 박스형 입력창                   |
| lg        | 16px   | `rounded-2xl`  | **큰 패널** (NoteEditor)        |
| xl        | 24px   | `rounded-3xl`  | (예비)                          |
| full      | 9999px | `rounded-full` | **버튼, 태그 칩, 배지, 검색바** |

## 그림자 (Elevation)

진한 그림자 대신 **옅고 따뜻한 그림자 + 얇은 테두리**를 함께 쓴다. [원본]

| 변수               | 값                                                                                |
| ------------------ | --------------------------------------------------------------------------------- |
| `--shadow-level-1` | `0 2px 8px -2px rgba(30, 30, 30, 0.05)`                                           |
| `--shadow-level-2` | `0 12px 24px -6px rgba(30, 30, 30, 0.08), 0 4px 8px -2px rgba(255, 199, 0, 0.12)` |
| `--shadow-level-3` | `0 20px 32px -8px rgba(30, 30, 30, 0.14)`                                         |

| 레벨 | 조합                                            | 노트 앱 용도                      |
| ---- | ----------------------------------------------- | --------------------------------- |
| 0    | `bg-background`                                 | 앱 캔버스                         |
| 1    | `bg-card border border-hairline shadow-level-1` | 카드 기본, 편집기 패널, 헤더      |
| 2    | `border-hairline-strong shadow-level-2`         | 카드 hover·선택                   |
| 3    | `shadow-level-3`                                | 모달, 토스트, 떠 있는 버튼 (예비) |
