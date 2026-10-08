# 디자인 시스템: Cheerful Notes

Stitch의 "Cheerful Delivery & Commerce"를 노트 앱에 맞게 정리한 문서다. **모든 스타일 작업은 이 폴더를 기준으로 한다.**
값은 `src/index.css`의 `@theme`과 같아야 하고, `src/design-system.test.ts`가 이를 검사한다.

## 이 작업이면 이 파일

| 작업                                             | 읽을 파일                                    |
| ------------------------------------------------ | -------------------------------------------- |
| 어떤 스타일 작업이든                             | `foundations/color.md` (항상)                |
| 글자 크기·굵기                                   | `foundations/typography.md`                  |
| 모서리·그림자                                    | `foundations/shape.md`                       |
| 여백·화면 배치                                   | `foundations/spacing-layout.md`              |
| hover·포커스·애니메이션                          | `foundations/motion.md`                      |
| 버튼                                             | `components/button.md`                       |
| 입력창·검색바                                    | `components/input.md`                        |
| 태그 (`TagInput`)                                | `components/tag.md`                          |
| 노트 카드·편집기 패널 (`NoteItem`, `NoteEditor`) | `components/card.md`                         |
| 헤더·사이드바 (`Layout`)                         | `components/layout.md`                       |
| 빈 상태·로딩·오류·문구                           | `components/feedback.md`                     |
| 왜 이렇게 정했는지                               | `decisions.md` (D-번호)                      |
| 문서에 없는 컴포넌트                             | `reference/commerce.md` → `source/stitch.md` |
| 눈으로 확인                                      | `preview/index.html`을 브라우저로 열기       |

## 관리 규칙

1. **새 규칙은 문서 먼저**: 문서에 없는 스타일이 필요하면 해당 문서와 `@theme`을 먼저 고치고 컴포넌트에 적용한다.
2. **결정은 `decisions.md`에만**: 다른 문서에는 `→ D-번호`로 연결만 한다. 결정을 바꿀 때는 기존 항목을 "대체됨"으로 표시하고 새 번호를 추가한다.
3. **토큰 표 형식 유지**: `foundations/`의 토큰 행은 ``| `--변수` | `값` |`` 형식이어야 테스트가 읽는다.
4. **컴포넌트 문서 틀**: 용도 → 변형/구성 → 상태 → 금지 → 출처. 새 컴포넌트 문서도 같은 틀로 만든다.
5. **원본 불변**: `source/`는 수정하지 않는다. 새 Stitch 화면은 `source/screens/`에 추가한다.

## 브랜드 원칙

1. **해바라기 노랑 + 차콜**: 노랑은 가장 중요한 곳에만, 노랑 위 글자는 항상 차콜.
2. **밝고 산뜻한 표면**: 따뜻한 회색 캔버스 위 흰 카드, 옅은 그림자 + 얇은 테두리.
3. **둥글고 통통하게**: 카드 8px, 큰 패널 16px, 버튼·칩·배지는 알약.
4. **가볍고 친근한 말투**: 안내 문구는 해요체.
