import { useState, memo } from 'react';
import { useBoardStore } from '@/store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

/**
 * Quick Add Task component.
 * Inline input field at the bottom of each column to quickly create tasks.
 */
export const QuickAdd = memo(function QuickAdd({ columnId }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const addTask = useBoardStore((s) => s.addTask);

  const handleCreate = () => {
    if (title.trim()) {
      addTask(columnId, title.trim());
      setTitle('');
      // If we want to stay in "adding" mode, we don't call setIsAdding(false)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreate();
    if (e.key === 'Escape') {
      setIsAdding(false);
      setTitle('');
    }
  };

  if (!isAdding) {
    return (
      <button 
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-2 p-3 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-surface-bright/50 border border-dashed border-slate-700/50 hover:border-slate-500 transition-all text-sm font-medium h-12 shrink-0 animate-in fade-in duration-300"
      >
        <span className="text-lg">+</span>
        Add New Task
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-surface-bright/50 border border-indigo-500/30 animate-in fade-in slide-in-from-top-1 duration-200">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => !title.trim() && setIsAdding(false)}
        placeholder="What needs to be done?"
        autoFocus
        className="!py-1 !px-2 !text-sm !bg-transparent !border-transparent hover:!border-transparent"
      />
      
      <div className="flex items-center justify-end gap-2 mt-1">
         <Button 
           variant="ghost" 
           size="sm" 
           onClick={() => setIsAdding(false)}
         >
           Cancel
         </Button>
         <Button 
           variant="primary" 
           size="sm" 
           onClick={handleCreate}
           disabled={!title.trim()}
         >
           Add Task
         </Button>
      </div>
    </div>
  );
});
