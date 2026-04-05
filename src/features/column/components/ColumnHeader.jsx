import { useState, memo } from 'react';
import { useBoardStore } from '@/store';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';

/**
 * Column Header component.
 * Displays column title, supports inline editing and actions.
 */
export const ColumnHeader = memo(function ColumnHeader({ column, dragHandleProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const updateColumn = useBoardStore((s) => s.updateColumn);
  const deleteColumn = useBoardStore((s) => s.deleteColumn);

  const handleBlur = () => {
    setIsEditing(false);
    if (title.trim() && title !== column.title) {
      updateColumn(column.id, { title: title.trim() });
    } else {
      setTitle(column.title);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBlur();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setTitle(column.title);
    }
  };

  const dropdownItems = [
    { label: 'Rename', onClick: () => setIsEditing(true) },
    { label: 'Delete', variant: 'danger', onClick: () => {
      if (confirm(`Are you sure you want to delete column "${column.title}"?`)) {
        deleteColumn(column.id);
      }
    }},
  ];

  return (
    <div className="flex flex-col gap-2 mb-4 group">
      {/* Color Accent */}
      <div 
        className="w-12 h-1 rounded-full mb-1" 
        style={{ backgroundColor: column.color || '#6366f1' }}
      />
      
      <div className="flex items-center justify-between gap-2 h-8">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="!py-1 !px-2 !text-sm !font-semibold !bg-transparent !border-indigo-500"
          />
        ) : (
          <div className="flex-1 flex items-center gap-1 overflow-hidden">
            <button
              {...dragHandleProps}
              className="p-1 cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0"
              title="Drag column"
              onPointerDown={(e) => e.stopPropagation()} // Optional to prevent focus stealing sometimes
            >
              <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
                <path d="M3 2C3 2.55228 2.55228 3 2 3C1.44772 3 1 2.55228 1 2C1 1.44772 1.44772 1 2 1C2.55228 1 3 1.44772 3 2ZM3 7C3 7.55228 2.55228 8 2 8C1.44772 8 1 7.55228 1 7C1 6.44772 1.44772 6 2 6C2.55228 6 3 6.44772 3 7ZM2 13C2.55228 13 3 12.5523 3 12C3 11.4477 2.55228 11 2 11C1.44772 11 1 11.4477 1 12C1 12.5523 1.44772 13 2 13ZM9 2C9 2.55228 8.55228 3 8 3C7.44772 3 7 2.55228 7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2ZM8 8C8.55228 8 9 7.55228 9 7C9 6.44772 8.55228 6 8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"/>
              </svg>
            </button>
            <h2 
              onClick={() => setIsEditing(true)}
              className="text-sm font-semibold text-slate-100 cursor-pointer truncate flex-1 hover:text-indigo-400 transition-colors"
            >
              {column.title}
              <span className="ml-2 text-slate-500 text-xs font-normal">
                {column.taskIds.length}
              </span>
            </h2>
          </div>
        )}

        <Dropdown
          trigger={
            <button className="p-1.5 text-slate-500 hover:text-slate-100 hover:bg-surface-bright rounded-lg opacity-0 group-hover:opacity-100 transition-all">
              •••
            </button>
          }
          items={dropdownItems}
          align="right"
        />
      </div>
    </div>
  );
});
