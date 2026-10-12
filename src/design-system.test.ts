import { describe, expect, it } from 'vitest';
import themeCss from './index.css?raw';

// 디자인 시스템 문서(docs/design-system)와 코드가 어긋나지 않는지 검사한다

const foundationDocs = import.meta.glob<string>('/docs/design-system/foundations/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const previewHtml = Object.values(
  import.meta.glob<string>('/docs/design-system/preview/index.html', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
)[0];
const componentSources = import.meta.glob<string>(['/src/**/*.tsx', '!/src/**/*.test.tsx'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

const normalize = (value: string) => value.trim().replace(/\s+/g, ' ').toLowerCase();

// `--이름: 값;` 선언을 모두 읽는다
function parseVars(block: string): Map<string, string> {
  const vars = new Map<string, string>();
  for (const [, name, value] of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    vars.set(name, normalize(value));
  }
  return vars;
}

// 문서 표의 `| `--이름` | `값` |` 행을 읽는다
function parseDocTokens(markdown: string): [string, string][] {
  return [...markdown.matchAll(/^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|/gm)].map(
    ([, name, value]) => [name, normalize(value)],
  );
}

const theme = parseVars(themeCss.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1] ?? '');
const preview = parseVars(previewHtml.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? '');
const docTokens = Object.entries(foundationDocs).flatMap(([file, markdown]) =>
  parseDocTokens(markdown).map(([name, value]) => ({ file, name, value })),
);

describe('디자인 토큰: 문서 ↔ @theme', () => {
  it('문서와 @theme을 읽을 수 있다', () => {
    expect(theme.size).toBeGreaterThan(0);
    expect(docTokens.length).toBeGreaterThan(0);
  });

  it('문서의 모든 토큰이 @theme에 같은 값으로 있다', () => {
    const mismatches = docTokens
      .filter(({ name, value }) => theme.get(name) !== value)
      .map(({ file, name, value }) => `${file}: ${name} 문서=${value} @theme=${theme.get(name)}`);
    expect(mismatches).toEqual([]);
  });

  it('@theme의 모든 토큰이 문서에 있다', () => {
    const documented = new Set(docTokens.map(({ name }) => name));
    const undocumented = [...theme.keys()].filter((name) => !documented.has(name));
    expect(undocumented).toEqual([]);
  });
});

describe('디자인 토큰: 미리보기 ↔ @theme', () => {
  // 미리보기는 `--primary`처럼 접두사 없이 쓰므로 `--color-primary` 또는 같은 이름으로 찾는다
  const themeNameOf = (name: string) =>
    [`--color-${name.slice(2)}`, name].find((candidate) => theme.has(candidate));

  it('미리보기의 토큰 값이 @theme과 같다', () => {
    const mismatches = [...preview.entries()]
      .map(([name, value]) => ({ name, value, themeName: themeNameOf(name) }))
      .filter(({ themeName, value }) => themeName && theme.get(themeName) !== value)
      .map(
        ({ name, value, themeName }) => `${name}=${value} ${themeName}=${theme.get(themeName!)}`,
      );
    expect(mismatches).toEqual([]);
  });

  it('@theme의 모든 색상이 미리보기에 있다', () => {
    const missing = [...theme.keys()]
      .filter((name) => name.startsWith('--color-'))
      .filter((name) => !preview.has(`--${name.slice('--color-'.length)}`));
    expect(missing).toEqual([]);
  });
});

describe('컴포넌트 스타일 규칙', () => {
  const rules: [string, RegExp][] = [
    ['임의 색상(#hex, rgb, hsl)', /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(/],
    ['임의 그림자(shadow-[...])', /shadow-\[/],
    ['인라인 스타일(style={{)', /style=\{\{/],
  ];

  it.each(rules)('%s를 쓰지 않는다', (_, pattern) => {
    const offenders = Object.entries(componentSources)
      .filter(([, source]) => pattern.test(source))
      .map(([file]) => file);
    expect(offenders).toEqual([]);
  });
});
