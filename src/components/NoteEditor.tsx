import { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import { addTags } from '../utils/tags';
import { TagInput } from './TagInput';

interface NoteEditorProps {
  selectedNoteId: string | null;
  isCreating: boolean;
  onDone: () => void;
}

export function NoteEditor({ selectedNoteId, isCreating, onDone }: NoteEditorProps) {
  const { notes, addNote, editNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagDraft, setTagDraft] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  // 선택된 노트가 바뀔 때 폼 동기화
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags);
      setTagDraft('');
    } else if (isCreating) {
      setTitle('');
      setContent('');
      setTags([]);
      setTagDraft('');
    }
  }, [selectedNoteId, isCreating]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    // 입력창에 남은 텍스트도 유효하면 태그로 포함 (입력 손실 방지)
    const { tags: finalTags } = addTags(tags, [tagDraft]);

    setSaving(true);
    try {
      if (isCreating) {
        await addNote(title, content, finalTags);
      } else if (selectedNoteId) {
        await editNote(selectedNoteId, { title, content, tags: finalTags });
      }
      setTags(finalTags);
      setTagDraft('');
      onDone();
    } catch (e) {
      console.error(e);
      alert('저장에 실패했어요');
    } finally {
      setSaving(false);
    }
  };

  // 아무것도 선택 안 된 상태
  if (!isCreating && !selectedNoteId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3">
          <div className="mx-auto size-16 rounded-full bg-primary-soft grid place-items-center text-3xl">
            📝
          </div>
          <p className="text-body-sm text-muted-foreground">
            노트를 고르거나 새 노트를 만들어보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl px-8 sm:px-12 py-8 border border-hairline shadow-level-1 max-w-2xl">
      {/* 섹션 라벨 */}
      <p className="mb-6 text-label-md tracking-widest uppercase text-muted-foreground">
        {isCreating ? '새 노트' : '노트 편집'}
      </p>

      {/* 제목 입력 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="w-full mb-4 text-headline-sm tracking-[-0.02em] text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/60"
      />

      {/* 태그 입력 */}
      <TagInput
        key={selectedNoteId ?? 'new'}
        tags={tags}
        draft={tagDraft}
        onTagsChange={setTags}
        onDraftChange={setTagDraft}
      />

      {/* 구분선 */}
      <div className="h-px bg-border mb-4" />

      {/* 내용 입력 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 적어보세요..."
        rows={14}
        className="w-full text-body-md text-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/60"
      />

      {/* 버튼 영역 */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary rounded-full px-6 py-3 text-label-lg cursor-pointer transition hover:scale-[1.02] hover:brightness-[0.97] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {saving ? '저장 중...' : '저장'}
        </button>
        <button
          onClick={onDone}
          className="bg-card text-foreground border border-border rounded-full px-5 py-2.5 text-label-lg cursor-pointer transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35"
        >
          취소
        </button>
      </div>
    </div>
  );
}
