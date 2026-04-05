import { memo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBoardStore } from '@/store';
import { selectActiveBoard } from '@/store/index';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/features/filter/components/SearchBar';

/**
 * Top Header component for FlowBoard.
 * Displays the current board title, search bar, and action buttons.
 */
export const Header = memo(function Header({ onToggleSidebar }) {
  const { activeBoard, updateBoard } = useBoardStore(
    useShallow((s) => ({
      activeBoard: selectActiveBoard(s),
      updateBoard: s.updateBoard,
    }))
  );

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('');

  const openEdit = () => {
    setTitle(activeBoard?.title || '');
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    if (title.trim() && title.trim() !== activeBoard?.title) {
      updateBoard(activeBoard.id, { title: title.trim() });
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-700/50 bg-surface-low/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-6">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-surface-bright rounded-lg transition-colors"
        >
          ☰
        </button>

        {/* Board Title (Editable) */}
        {isEditingTitle ? (
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSaveTitle(); }}
            className="flex items-center"
          >
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => e.key === 'Escape' && setIsEditingTitle(false)}
              className="!text-xl !font-bold !py-1 !px-2 !bg-surface-bright/50 !border-indigo-500 !text-slate-100"
            />
          </form>
        ) : (
          <div 
            onClick={activeBoard ? openEdit : undefined}
            className={`group flex items-center gap-3 cursor-pointer ${!activeBoard ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <h1 className="text-xl font-bold text-slate-100 transition-colors group-hover:text-indigo-400">
              {activeBoard ? activeBoard.title : 'No active board'}
            </h1>
            {activeBoard && (
              <span className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-surface-bright px-2 py-0.5 rounded-full">
                Edit Title
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Actual Search Bar Component */}
        <div className="hidden sm:block">
           <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={() => <span>⚙️</span>}>
            Settings
          </Button>
          <div className="w-8 h-8 rounded-full bg-surface-bright border border-slate-700/50 flex items-center justify-center overflow-hidden">
             <span className="text-xs font-bold text-slate-300">OD</span>
          </div>
        </div>
      </div>
    </header>
  );
});
