import { useState, memo } from 'react';
import { useBoardStore } from '@/store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

/**
 * Add Column component.
 * Inline trigger to add new columns at the end of the board.
 */
export const AddColumn = memo(function AddColumn() {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const addColumn = useBoardStore((s) => s.addColumn);

  const handleAdd = () => {
    if (title.trim()) {
      addColumn(activeBoardId, title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button 
        onClick={() => setIsAdding(true)}
        className="flex items-center justify-center gap-3 w-[280px] h-14 shrink-0 rounded-2xl bg-surface-low border border-dashed border-slate-700/50 hover:bg-surface-bright/50 hover:border-slate-500 transition-all text-slate-500 hover:text-slate-200 mt-12"
      >
        <span className="text-2xl font-light">+</span>
        <span className="font-semibold text-sm">Add New Column</span>
      </button>
    );
  }

  return (
    <div className="w-[280px] shrink-0 bg-surface-low border border-slate-700/50 p-4 rounded-2xl h-fit mt-12 animate-in fade-in slide-in-from-top-2 duration-300">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Column Name..."
        autoFocus
        className="mb-3"
      />
      <div className="flex items-center gap-2">
        <Button 
          variant="primary" 
          size="sm" 
          onClick={handleAdd}
          disabled={!title.trim()}
        >
          Add Column
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAdding(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});
