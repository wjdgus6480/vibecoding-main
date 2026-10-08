export const MAX_TAG_LENGTH = 20;
export const MAX_TAGS = 10;

export type TagError = 'empty' | 'tooLong' | 'duplicate' | 'limit';

export type TagValidation = { ok: true; tag: string } | { ok: false; reason: TagError };

// 빈 값(empty)은 메시지 없이 무시한다
export const TAG_ERROR_MESSAGES: Record<Exclude<TagError, 'empty'>, string> = {
  tooLong: `태그는 ${MAX_TAG_LENGTH}자까지 입력할 수 있어요`,
  duplicate: '이미 있는 태그예요',
  limit: `태그는 최대 ${MAX_TAGS}개까지 추가할 수 있어요`,
};

// 앞뒤 공백 제거 → 맨 앞 # 제거 → 연속 공백 축약
export function normalizeTag(raw: string): string {
  return raw.trim().replace(/^#+/, '').replace(/\s+/g, ' ').trim();
}

// 대소문자를 무시하고 비교한다
export function hasTag(tags: string[], tag: string): boolean {
  const target = tag.toLowerCase();
  return tags.some((t) => t.toLowerCase() === target);
}

export function validateTag(raw: string, existing: string[]): TagValidation {
  const tag = normalizeTag(raw);
  if (!tag) return { ok: false, reason: 'empty' };
  if (tag.length > MAX_TAG_LENGTH) return { ok: false, reason: 'tooLong' };
  if (hasTag(existing, tag)) return { ok: false, reason: 'duplicate' };
  if (existing.length >= MAX_TAGS) return { ok: false, reason: 'limit' };
  return { ok: true, tag };
}

// 여러 값을 순서대로 추가 시도한다. 실패한 값은 건너뛰고 첫 번째 실패 사유만 돌려준다
export function addTags(
  tags: string[],
  raws: string[],
): { tags: string[]; error: Exclude<TagError, 'empty'> | null } {
  let next = tags;
  let error: Exclude<TagError, 'empty'> | null = null;

  for (const raw of raws) {
    const result = validateTag(raw, next);
    if (result.ok) {
      next = [...next, result.tag];
    } else if (result.reason !== 'empty' && !error) {
      error = result.reason;
    }
  }

  return { tags: next, error };
}
