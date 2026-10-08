# 레이아웃

**용도**: 헤더 + 사이드바/메인 2단 화면 (`Layout.tsx`).

| 영역      | 클래스                                                                                      |
| --------- | ------------------------------------------------------------------------------------------- |
| 루트      | `min-h-screen bg-background`                                                                |
| **헤더**  | `h-16 px-8 flex items-center justify-between bg-card border-b border-border shadow-level-1` |
| 로고      | `text-headline-md font-extrabold tracking-[-0.02em] text-foreground` ("📝 Notes")           |
| 헤더 버튼 | `components/button.md`의 Secondary (+ 새 노트)                                              |
| 본문      | `flex h-[calc(100vh-4rem)]` → D-010                                                         |
| 사이드바  | `w-72 shrink-0 overflow-y-auto bg-muted border-r border-border p-3 space-y-2`               |
| 메인      | `flex-1 overflow-y-auto p-8`                                                                |

## 금지

- `style={{ ... }}` 인라인 스타일을 쓰지 않는다(폰트, 높이 포함).
- 헤더 높이를 `65px` 같은 매직넘버로 계산하지 않는다.

**출처**: [원본] Layout & Spacing / [파생] 2단 레이아웃 수치
