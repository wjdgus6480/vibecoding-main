# 태그 칩 · 배지

**용도**: 노트에 붙은 태그 표시와 편집. 기능 규칙(정규화, 중복, 개수)은 `docs/features/tag/spec-fixed.md`를 본다.

## 구성 (`TagInput.tsx`)

| 요소        | 클래스                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 칩 목록     | `flex flex-wrap items-center gap-2`                                                                                                                     |
| **태그 칩** | `inline-flex items-center gap-1 bg-pastel-yellow text-foreground rounded-full px-3 py-1 text-label-md`                                                  |
| 칩 삭제(×)  | `text-muted-foreground cursor-pointer transition-colors hover:text-destructive` + `aria-label="태그 삭제: {이름}"`                                      |
| 입력창      | `flex-1 min-w-32 text-body-sm text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed` |
| 오류 메시지 | `mt-2 text-label-md text-destructive` (해요체, 예: "이미 있는 태그예요")                                                                                |

## 배지 (예비)

| 변형        | 클래스                                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| 상태 배지   | `bg-pastel-green` / `bg-pastel-red` + `text-foreground rounded-full px-2.5 py-0.5 text-label-sm`         |
| 카운트 배지 | `bg-accent text-on-primary rounded-full min-w-5 h-5 px-1.5 text-label-sm inline-grid place-items-center` |

## 금지

- 태그마다 다른 색을 쓰지 않는다. → D-012
- 칩 글자를 흰색으로 쓰지 않는다(파스텔 위 대비 부족).

**출처**: [원본] Badges & Tags (파스텔 알약, 고대비 글자)
