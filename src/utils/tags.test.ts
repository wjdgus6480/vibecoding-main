import { describe, expect, it } from 'vitest';
import { addTags, hasTag, MAX_TAG_LENGTH, MAX_TAGS, normalizeTag, validateTag } from './tags';

describe('normalizeTag', () => {
  it('앞뒤 공백을 제거한다', () => {
    expect(normalizeTag('  react  ')).toBe('react');
  });

  it('맨 앞의 #을 모두 제거한다', () => {
    expect(normalizeTag('##react')).toBe('react');
    expect(normalizeTag('# react')).toBe('react');
  });

  it('연속 공백을 하나로 줄인다', () => {
    expect(normalizeTag('react   hooks')).toBe('react hooks');
  });
});

describe('hasTag', () => {
  it('대소문자를 무시하고 비교한다', () => {
    expect(hasTag(['React'], 'react')).toBe(true);
    expect(hasTag(['React'], 'Vue')).toBe(false);
  });
});

describe('validateTag', () => {
  it('정규화한 태그를 돌려준다', () => {
    expect(validateTag(' #React ', [])).toEqual({ ok: true, tag: 'React' });
  });

  it('공백이나 #만 있으면 empty', () => {
    expect(validateTag('   ', [])).toEqual({ ok: false, reason: 'empty' });
    expect(validateTag('#', [])).toEqual({ ok: false, reason: 'empty' });
  });

  it(`${MAX_TAG_LENGTH}자까지 허용하고 넘으면 tooLong`, () => {
    expect(validateTag('a'.repeat(MAX_TAG_LENGTH), []).ok).toBe(true);
    expect(validateTag('a'.repeat(MAX_TAG_LENGTH + 1), [])).toEqual({
      ok: false,
      reason: 'tooLong',
    });
  });

  it('대소문자만 다른 태그는 duplicate', () => {
    expect(validateTag(' react ', ['React'])).toEqual({ ok: false, reason: 'duplicate' });
  });

  it(`${MAX_TAGS}개가 차면 limit`, () => {
    const full = Array.from({ length: MAX_TAGS }, (_, i) => `tag${i}`);
    expect(validateTag('new', full)).toEqual({ ok: false, reason: 'limit' });
  });
});

describe('addTags', () => {
  it('여러 값을 순서대로 추가하고 실패한 값은 건너뛴다', () => {
    const result = addTags(['React'], ['Vue', 'react', '', 'Svelte']);
    expect(result.tags).toEqual(['React', 'Vue', 'Svelte']);
    expect(result.error).toBe('duplicate');
  });

  it('같은 입력 안의 중복도 막는다', () => {
    expect(addTags([], ['a', 'A']).tags).toEqual(['a']);
  });

  it('빈 값만 있으면 에러 없이 원래 배열을 돌려준다', () => {
    const tags = ['React'];
    const result = addTags(tags, ['  ']);
    expect(result.tags).toBe(tags);
    expect(result.error).toBeNull();
  });
});
