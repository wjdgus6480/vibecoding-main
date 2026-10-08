import { Note } from '../types/note';

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteItem({ note, isSelected, onSelect, onDelete }: NoteItemProps) {
  return (
    <div
      onClick={() => onSelect(note.id)}
      className={`bg-card rounded-lg p-4 border cursor-pointer transition-shadow ${
        isSelected
          ? 'border-hairline-strong ring-2 ring-primary shadow-level-2'
          : 'border-hairline shadow-level-1 hover:border-hairline-strong hover:shadow-level-2'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex-1 text-label-lg text-foreground line-clamp-1">
          {note.title || '(제목 없음)'}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="shrink-0 text-label-sm text-muted-foreground cursor-pointer transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35"
        >
          삭제
        </button>
      </div>
      <p className="mt-1.5 text-body-sm text-muted-foreground line-clamp-2">
        {note.content || '(내용 없음)'}
      </p>
      <p className="mt-2 text-label-sm text-muted-foreground">
        {new Date(note.updatedAt).toLocaleDateString('ko-KR')}
      </p>
    </div>
  );
}
