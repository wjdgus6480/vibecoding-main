# 타이포그래피

> 폰트 → D-003
> 표의 `--변수`와 값은 `src/index.css`의 `@theme`과 같아야 한다(`src/design-system.test.ts`가 검사).

## 폰트

| 변수          | 값                                                                  |
| ------------- | ------------------------------------------------------------------- |
| `--font-sans` | `'Plus Jakarta Sans', 'Pretendard Variable', system-ui, sans-serif` |

- 로드: `index.html`에서 Google Fonts `Plus Jakarta Sans`(400·500·600·700·800)와 Pretendard(CDN)를 불러온다.
- `body`에 `font-sans`가 기본 적용된다. 컴포넌트에 `fontFamily`를 인라인으로 쓰지 않는다.

## 스케일

클래스는 `text-<이름>`이다(예: `text-headline-sm`). 크기, 줄높이, 굵기가 한 번에 적용된다. 굵기만 바꿀 때는 `font-extrabold`처럼 덧붙인다.
**헤드라인은 `tracking-[-0.02em]`을 함께 쓴다.** [원본]

| 이름          | 크기 / 줄높이 / 굵기 | 노트 앱 용도                               |
| ------------- | -------------------- | ------------------------------------------ |
| `headline-md` | 24 / 32 / 700        | 헤더 로고 (`font-extrabold`로 800)         |
| `headline-sm` | 20 / 28 / 700        | 편집기 제목 입력                           |
| `body-md`     | 16 / 24 / 400        | 편집기 본문                                |
| `body-sm`     | 14 / 20 / 400        | 카드 미리보기, 안내 문구, 태그 입력        |
| `label-lg`    | 14 / 18 / 700        | 버튼, 카드 제목                            |
| `label-md`    | 12 / 16 / 700        | 섹션 라벨, 태그 칩, 노트 개수, 오류 메시지 |
| `label-sm`    | 11 / 14 / 600        | 날짜, 텍스트 버튼(삭제)                    |

원본에는 `headline-xl`(40), `headline-lg`(32), `body-lg`(18)도 있다. 노트 앱에서 쓰는 곳이 없어 `@theme`에 넣지 않았다. 필요해지면 `source/stitch.md` 값으로 추가한다.

## `@theme` 변수

| 변수                              | 값          |
| --------------------------------- | ----------- |
| `--text-headline-md`              | `1.5rem`    |
| `--text-headline-md--line-height` | `2rem`      |
| `--text-headline-md--font-weight` | `700`       |
| `--text-headline-sm`              | `1.25rem`   |
| `--text-headline-sm--line-height` | `1.75rem`   |
| `--text-headline-sm--font-weight` | `700`       |
| `--text-body-md`                  | `1rem`      |
| `--text-body-md--line-height`     | `1.5rem`    |
| `--text-body-sm`                  | `0.875rem`  |
| `--text-body-sm--line-height`     | `1.25rem`   |
| `--text-label-lg`                 | `0.875rem`  |
| `--text-label-lg--line-height`    | `1.125rem`  |
| `--text-label-lg--font-weight`    | `700`       |
| `--text-label-md`                 | `0.75rem`   |
| `--text-label-md--line-height`    | `1rem`      |
| `--text-label-md--font-weight`    | `700`       |
| `--text-label-sm`                 | `0.6875rem` |
| `--text-label-sm--line-height`    | `0.875rem`  |
| `--text-label-sm--font-weight`    | `600`       |
