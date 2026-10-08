# 버튼

**용도**: 사용자가 실행하는 동작. 모든 버튼은 알약 모양(`rounded-full`)이고 글자는 `text-label-lg`다.

## 변형

| 변형                   | 클래스                                                                                                                                 | 사용처                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Primary** (노랑, 큼) | `bg-primary text-on-primary rounded-full px-6 py-3 text-label-lg cursor-pointer transition hover:scale-[1.02] hover:brightness-[0.97]` | `NoteEditor.tsx` 저장  |
| **Secondary** (차콜)   | `bg-secondary text-on-secondary rounded-full px-5 py-2.5 text-label-lg cursor-pointer transition hover:scale-[1.02]`                   | `Layout.tsx` + 새 노트 |
| **Ghost**              | `bg-card text-foreground border border-border rounded-full px-5 py-2.5 text-label-lg cursor-pointer transition-colors hover:bg-muted`  | `NoteEditor.tsx` 취소  |
| **Text (위험)**        | `text-label-sm text-muted-foreground cursor-pointer transition-colors hover:text-destructive`                                          | `NoteItem.tsx` 삭제    |

## 상태 (모든 변형에 공통으로 덧붙임)

| 상태          | 클래스                                                                          |
| ------------- | ------------------------------------------------------------------------------- |
| 키보드 포커스 | `focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35` |
| 비활성        | `disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`      |
| 진행 중       | 라벨을 "저장 중..."으로 바꾸고 `disabled`                                       |

## 금지

- 노란 Primary를 한 화면에 두 개 이상 두지 않는다. → D-008
- 노랑 버튼에 흰 글자를 쓰지 않는다. → D-007
- `rounded-xl`처럼 알약이 아닌 모서리를 쓰지 않는다.

**출처**: [원본] Primary·Secondary·Ghost 버튼 / [파생] Text 버튼, 크기 단계(Primary가 큼)
