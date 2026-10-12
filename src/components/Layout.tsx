import { ReactNode } from 'react';

interface LayoutProps {
  onNewNote: () => void;
  sidebar: ReactNode;
  main: ReactNode;
}

export function Layout({ onNewNote, sidebar, main }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="h-16 px-8 flex items-center justify-between bg-card border-b border-border shadow-level-1">
        <h1 className="text-headline-md font-extrabold tracking-[-0.02em] text-foreground">
          📝 Notes
        </h1>
        <button
          onClick={onNewNote}
          className="bg-secondary text-on-secondary rounded-full px-5 py-2.5 text-label-lg cursor-pointer transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/35"
        >
          + 새 노트
        </button>
      </header>

      {/* 바디 */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 사이드바 */}
        <div className="w-72 shrink-0 overflow-y-auto bg-muted border-r border-border p-3 space-y-2">
          {sidebar}
        </div>

        {/* 메인 */}
        <div className="flex-1 overflow-y-auto p-8">{main}</div>
      </div>
    </div>
  );
}
