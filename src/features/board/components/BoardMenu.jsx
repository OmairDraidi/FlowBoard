import { useState, memo } from 'react';
import { useBoardStore } from '@/store';
import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

/**
 * Board Actions Menu component.
 * Provides rename and delete functionality for a board.
 */
export const BoardMenu = memo(function BoardMenu({ board }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState(board.title);
  const updateBoard = useBoardStore((s) => s.updateBoard);
  const deleteBoard = useBoardStore((s) => s.deleteBoard);

  const handleRename = () => {
    if (title.trim() && title !== board.title) {
      updateBoard(board.id, { title: title.trim() });
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRename();
    if (e.key === 'Escape') {
      setIsRenaming(false);
      setTitle(board.title);
    }
  };

  const menuItems = [
    { label: 'Rename Board', onClick: () => setIsRenaming(true) },
    { label: 'Delete Board', variant: 'danger', onClick: () => setIsDeleting(true) },
  ];

  if (isRenaming) {
    return (
      <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRename}
          onKeyDown={handleKeyDown}
          autoFocus
          className="!py-0.5 !px-2 !text-xs !bg-transparent !border-indigo-500"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 truncate font-medium text-sm">
        {board.title}
      </div>
      
      <div onClick={(e) => e.stopPropagation()}>
        <Dropdown
          trigger={
            <button className="p-1 text-slate-500 hover:text-slate-100 hover:bg-surface-bright/50 rounded transition-all opacity-0 group-hover:opacity-100">
              •••
            </button>
          }
          items={menuItems}
          align="right"
        />
      </div>

      <ConfirmDialog
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() => deleteBoard(board.id)}
        title="Delete Board?"
        description={`This will permanently delete board "${board.title}" and all its columns and tasks. This action cannot be undone.`}
        confirmText="Delete Board"
      />
    </>
  );
});
