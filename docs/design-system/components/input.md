# 입력창

**용도**: 텍스트 입력. 편집기는 패널 자체가 입력 영역이라 테두리 없는 인라인 입력을 쓴다.

## 변형

| 변형              | 클래스                                                                                                                                                                                                                                       | 사용처                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| **인라인 · 제목** | `w-full text-headline-sm tracking-[-0.02em] text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/60`                                                                                                    | `NoteEditor.tsx` 제목 |
| **인라인 · 본문** | `w-full text-body-md text-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/60`                                                                                                               | `NoteEditor.tsx` 내용 |
| **인라인 · 태그** | → `components/tag.md`                                                                                                                                                                                                                        | `TagInput.tsx`        |
| 박스 (예비)       | `bg-card border border-border rounded-xl px-4 py-3 text-body-sm outline-none focus:ring-3 focus:ring-primary/35 focus:border-primary`                                                                                                        | 설정 폼 등            |
| 검색바 (예비)     | `h-12 bg-card border border-border rounded-full pl-11 pr-10 text-body-sm outline-none focus:ring-3 focus:ring-primary/35 focus:border-primary` + 왼쪽 차콜 돋보기 아이콘(`left-4`) + 오른쪽 지우기 버튼(`size-[22px] rounded-full bg-muted`) | 노트 검색             |

## 상태

| 상태        | 규칙                                                    |
| ----------- | ------------------------------------------------------- |
| placeholder | `placeholder:text-muted-foreground/60`                  |
| 포커스      | 인라인은 표시 없음(캐럿만), 박스·검색바는 노란 링       |
| 비활성      | `disabled:cursor-not-allowed` + placeholder로 사유 표시 |

## 금지

- 인라인 입력에 테두리나 배경을 넣지 않는다.
- 포커스 링을 노랑 외의 색으로 쓰지 않는다.

**출처**: [원본] Search Bar / [파생] 인라인 입력, 박스 입력
