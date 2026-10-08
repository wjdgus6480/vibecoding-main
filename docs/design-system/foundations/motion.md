# 상호작용 · 모션

> 표의 `--변수`와 값은 `src/index.css`의 `@theme`과 같아야 한다(`src/design-system.test.ts`가 검사).

| 변수            | 값                                  | 클래스        | 출처                         |
| --------------- | ----------------------------------- | ------------- | ---------------------------- |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `ease-spring` | [파생] 원본의 "spring-eased" |

| 항목                    | 클래스                                                                          | 출처                 |
| ----------------------- | ------------------------------------------------------------------------------- | -------------------- |
| 포커스 링               | `focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35` | [원본] 검색바 포커스 |
| 입력 포커스 링          | `focus:ring-3 focus:ring-primary/35 focus:border-primary`                       | [원본]               |
| Primary·Secondary hover | `transition hover:scale-[1.02]` (+ Primary는 `hover:brightness-[0.97]`)         | [원본]               |
| 기본 전환               | `transition-colors` / `transition-shadow` (Tailwind 기본 150ms)                 | [파생]               |
| 스프링 (체크박스 등)    | `duration-200 ease-spring`                                                      | [파생]               |
| 비활성                  | `disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100`      | [파생] 기존 값 유지  |

- 모든 클릭 요소는 `cursor-pointer`를 준다. Tailwind v4는 버튼에 기본 포인터 커서가 없다.
