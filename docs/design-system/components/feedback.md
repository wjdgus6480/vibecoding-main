# 피드백 · 문구

**용도**: 빈 상태, 로딩, 오류, 개수 표시, 그리고 모든 UI 문구의 톤.

## 상태 표시

| 대상              | 클래스                                                                                      | 사용처                  |
| ----------------- | ------------------------------------------------------------------------------------------- | ----------------------- |
| 빈 상태 컨테이너  | `flex items-center justify-center h-full` > `text-center space-y-3`                         | `NoteEditor.tsx` 미선택 |
| 빈 상태 아이콘 칩 | `mx-auto size-16 rounded-full bg-primary-soft grid place-items-center text-3xl` (이모지 📝) | 〃                      |
| 빈 상태 문구      | `text-body-sm text-muted-foreground`                                                        | 〃                      |
| 목록 로딩·빈 목록 | `py-8 text-center text-body-sm text-muted-foreground`                                       | `NoteList.tsx`          |
| 목록 오류         | `py-8 text-center text-body-sm text-destructive`                                            | 〃                      |
| 개수 라벨         | `px-1 pb-1 text-label-md tracking-widest uppercase text-muted-foreground`                   | 〃 "노트 4개"           |

## 문구 톤 → D-013

| 종류         | 규칙                      | 예                                                             |
| ------------ | ------------------------- | -------------------------------------------------------------- |
| 안내·빈 상태 | 해요체, 권유형            | "노트를 고르거나 새 노트를 만들어보세요", "아직 노트가 없어요" |
| 진행 중      | 해요체 + 말줄임           | "불러오는 중이에요...", "저장 중..."                           |
| 오류         | 해요체, 무엇이 잘못됐는지 | "저장에 실패했어요", "이미 있는 태그예요"                      |
| 버튼         | 짧은 명사·동사            | "저장", "취소", "+ 새 노트", "삭제"                            |
| 입력 요청    | "~해주세요"               | "제목을 입력해주세요"                                          |

- 합쇼체("~습니다", "~하세요")는 쓰지 않는다.

## 금지

- 빈 상태에 큰 이모지만 단독으로 두지 않는다. 아이콘 칩 안에 넣는다.
- 오류 메시지에 영어 원문(`Failed to ...`)을 그대로 노출하지 않는다(`NoteList`는 "노트를 불러오지 못했어요"로 표시).

**출처**: [원본] Category Icon Chips(아이콘 칩), Brand & Style(톤) / [파생] 한국어 문구 규칙
