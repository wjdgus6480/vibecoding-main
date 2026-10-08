import { useState, ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import { addTags, MAX_TAGS, TAG_ERROR_MESSAGES } from '../utils/tags';

interface TagInputProps {
  tags: string[];
  draft: string;
  onTagsChange: (tags: string[]) => void;
  onDraftChange: (draft: string) => void;
}

export function TagInput({ tags, draft, onTagsChange, onDraftChange }: TagInputProps) {
  const [message, setMessage] = useState<string | null>(null);
  const isFull = tags.length >= MAX_TAGS;

  // 여러 값을 추가 시도하고, 첫 번째 실패 사유를 메시지로 표시
  const commit = (raws: string[]) => {
    const result = addTags(tags, raws);
    if (result.tags !== tags) onTagsChange(result.tags);
    setMessage(result.error ? TAG_ERROR_MESSAGES[result.error] : null);
    return result;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 쉼표는 구분자: 쉼표 앞부분은 태그로 추가하고 마지막 조각만 입력창에 남긴다
    if (value.includes(',')) {
      const parts = value.split(',');
      const rest = parts.pop() ?? '';
      commit(parts);
      onDraftChange(rest);
      return;
    }
    setMessage(null);
    onDraftChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 한글 조합 중 Enter는 무시 (Safari는 keyCode 229로만 알 수 있다)
      if (e.nativeEvent.isComposing || e.keyCode === 229) return;
      e.preventDefault();
      const result = commit([draft]);
      if (!result.error) onDraftChange('');
      return;
    }

    if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
      setMessage(null);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    if (!text.includes(',')) return;
    e.preventDefault();
    commit((draft + text).split(','));
    onDraftChange('');
  };

  const handleRemove = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag));
    setMessage(null);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-pastel-yellow text-foreground rounded-full px-3 py-1 text-label-md"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemove(tag)}
              aria-label={`태그 삭제: ${tag}`}
              className="text-muted-foreground cursor-pointer transition-colors hover:text-destructive"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={isFull}
          aria-label="태그 입력"
          placeholder={isFull ? `태그는 최대 ${MAX_TAGS}개까지` : '태그 입력 후 Enter'}
          className="flex-1 min-w-32 text-body-sm text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed"
        />
      </div>
      {message && <p className="mt-2 text-label-md text-destructive">{message}</p>}
    </div>
  );
}
