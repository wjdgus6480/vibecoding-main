import { useNotes } from '../context/NotesContext';
import { NoteItem } from './NoteItem';

interface NoteListProps {
  selectedNoteId: string | null;
  onSelect: (id: string) => void;
}

export function NoteList({ selectedNoteId, onSelect }: NoteListProps) {
  const { notes, loading, error, removeNote } = useNotes();

  if (loading) {
    return (
      <p className="py-8 text-center text-body-sm text-muted-foreground">불러오는 중이에요...</p>
    );
  }

  if (error) {
    // API 에러 원문(영어)은 노출하지 않는다
    return (
      <p className="py-8 text-center text-body-sm text-destructive">노트를 불러오지 못했어요</p>
    );
  }

  if (notes.length === 0) {
    return (
      <p className="py-8 text-center text-body-sm text-muted-foreground">아직 노트가 없어요</p>
    );
  }

  return (
    <>
      <p className="px-1 pb-1 text-label-md tracking-widest uppercase text-muted-foreground">
        노트 {notes.length}개
      </p>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          isSelected={note.id === selectedNoteId}
          onSelect={onSelect}
          onDelete={removeNote}
        />
      ))}
    </>
  );
}
