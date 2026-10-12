# 카드 · 패널

**용도**: 노트 목록 항목(카드)과 편집기(큰 패널). 그림자 단계는 `foundations/shape.md`를 본다.

## NoteItem (`NoteItem.tsx`)

| 상태     | 클래스                                                                             |
| -------- | ---------------------------------------------------------------------------------- |
| 공통     | `bg-card rounded-lg p-4 border cursor-pointer transition-shadow`                   |
| 기본     | `border-hairline shadow-level-1 hover:border-hairline-strong hover:shadow-level-2` |
| **선택** | `border-hairline-strong ring-2 ring-primary shadow-level-2` → D-009                |

| 내부 요소 | 클래스                                                                           |
| --------- | -------------------------------------------------------------------------------- |
| 제목      | `flex-1 text-label-lg text-foreground line-clamp-1` (빈 값은 "(제목 없음)")      |
| 삭제 버튼 | `components/button.md`의 Text(위험) + `shrink-0`                                 |
| 미리보기  | `mt-1.5 text-body-sm text-muted-foreground line-clamp-2` (빈 값은 "(내용 없음)") |
| 날짜      | `mt-2 text-label-sm text-muted-foreground` (`toLocaleDateString('ko-KR')`)       |

## NoteEditor 패널 (`NoteEditor.tsx`)

| 요소      | 클래스                                                                                         |
| --------- | ---------------------------------------------------------------------------------------------- |
| 패널      | `bg-card rounded-2xl px-8 sm:px-12 py-8 border border-hairline shadow-level-1 max-w-2xl`       |
| 섹션 라벨 | `mb-6 text-label-md tracking-widest uppercase text-muted-foreground` ("새 노트" / "노트 편집") |
| 구분선    | `h-px bg-border mb-4`                                                                          |
| 버튼 영역 | `flex items-center gap-3 mt-6 pt-4 border-t border-border` (저장 Primary + 취소 Ghost)         |

## 금지

- 선택 표시에 `border-2`를 쓰지 않는다(크기 밀림). → D-009
- `shadow-[...]` 임의 그림자를 쓰지 않는다. `shadow-level-*`만 쓴다.

**출처**: [원본] Cards (Level 1/2, 8px·16px 모서리) / [파생] 선택 상태, 텍스트 전용 카드 → D-002
