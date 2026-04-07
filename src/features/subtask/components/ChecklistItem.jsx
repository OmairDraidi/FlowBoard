import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';

/**
 * Individual checklist item with toggle, inline edit, and delete actions.
 */
export const ChecklistItem = memo(function ChecklistItem({
  subtask,
  onToggle,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(subtask.title);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (title.trim() && title !== subtask.title) {
      onUpdate(subtask.id, { title: title.trim() });
    } else {
      setTitle(subtask.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
    if (e.key === 'Escape') {
      setTitle(subtask.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex items-start gap-4 py-2 px-1 rounded-lg hover:bg-slate-800/20 transition-colors">
      {/* Custom Checkbox */}
      <button
        onClick={() => onToggle(subtask.id)}
        className={`
          flex-shrink-0 w-5 h-5 mt-0.5 rounded border transition-all duration-200
          flex items-center justify-center text-[10px] font-bold
          ${
            subtask.isCompleted
              ? 'bg-indigo-500 border-indigo-500 text-white'
              : 'border-slate-600 hover:border-indigo-400 bg-transparent'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {subtask.isCompleted && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              ✓
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Content */}
      <div className="flex-grow min-w-0">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="!py-0.5 !px-1 h-7 border-none bg-surface-bright ring-1 ring-indigo-500"
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            className={`
              text-sm leading-6 cursor-pointer break-words transition-all duration-200
              ${subtask.isCompleted ? 'text-slate-500 line-through' : 'text-slate-200'}
            `}
          >
            {subtask.title}
          </p>
        )}
      </div>

      {/* Actions */}
      <button
        onClick={() => onDelete(subtask.id)}
        className="opacity-0 group-hover:opacity-100 px-2 py-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all text-xs"
        title="Delete item"
      >
        ✕
      </button>
    </div>
  );
});
