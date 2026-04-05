import { useState, memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useBoardStore } from '@/store';
import { useTheme } from '@/context/ThemeContext';
import { BoardMenu } from '@/features/board/components/BoardMenu';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

/**
 * Sidebar Navigation for FlowBoard.
 * Manages board switching and provides theme toggle.
 */
export const Sidebar = memo(function Sidebar({ isCollapsed, onToggleCollapse }) {
  const { boardsMap, activeBoardId, setActiveBoard, addBoard } = useBoardStore(
    useShallow((s) => ({
      boardsMap: s.boards,
      activeBoardId: s.activeBoardId,
      setActiveBoard: s.setActiveBoard,
      addBoard: s.addBoard,
    }))
  );

  const boards = Object.values(boardsMap);

  const { theme, toggleTheme } = useTheme();

  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleAddBoard = () => {
    if (newBoardTitle.trim()) {
      addBoard(newBoardTitle.trim());
      setNewBoardTitle('');
      setIsAddingBoard(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddBoard();
    if (e.key === 'Escape') setIsAddingBoard(false);
  };

  return (
    <aside
      className={`
        flex-1 w-full bg-surface-low border-r border-slate-700/50 flex flex-col transition-all duration-300
      `}
    >
      {/* Logo & App Name */}
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl text-slate-100 tracking-tight"
            >
              FlowBoard
            </motion.span>
          )}
        </div>
      </div>

      {/* Boards List */}
      <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
        {!isCollapsed && (
          <div className="px-6 mb-4">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
               All Boards ({boards.length})
             </h3>
          </div>
        )}

        <div className="space-y-1 px-3">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => setActiveBoard(board.id)}
              className={`
                group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer
                ${activeBoardId === board.id 
                  ? 'bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 shadow-sm shadow-indigo-500/10' 
                  : 'text-slate-400 hover:text-slate-100 border border-transparent hover:bg-surface-bright'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <span className="shrink-0 text-lg">📋</span>
              {!isCollapsed && (
                 <BoardMenu board={board} />
              )}
            </div>
          ))}

          {/* New Board Action */}
          {isAddingBoard && !isCollapsed ? (
            <div className="px-3 py-3 rounded-xl bg-surface-bright/50 border border-indigo-500/30 flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
               <Input
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  placeholder="Board Name..."
                  className="!py-1.5 !px-2 !text-xs !bg-surface-variant !border-transparent focus:!border-indigo-500/50"
               />
               <div className="flex gap-2">
                 <Button variant="primary" size="sm" className="flex-1 !py-1" onClick={handleAddBoard} disabled={!newBoardTitle.trim()}>
                   Create
                 </Button>
                 <Button variant="ghost" size="sm" className="flex-1 !py-1" onClick={() => setIsAddingBoard(false)}>
                   Cancel
                 </Button>
               </div>
            </div>
          ) : (
            <button
              onClick={() => {
                if (isCollapsed) onToggleCollapse();
                setIsAddingBoard(true);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-indigo-400 
                hover:text-indigo-300 hover:bg-surface-bright transition-all
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <span className="shrink-0 text-lg">+</span>
              {!isCollapsed && <span className="font-medium text-sm">Create New Board</span>}
            </button>
          )}
        </div>
      </div>

      {/* Footer / Utilities */}
      <div className="p-4 border-t border-slate-700/50 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 
            hover:text-slate-100 hover:bg-surface-bright transition-all
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <span className="shrink-0 text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
          {!isCollapsed && (
            <span className="font-medium text-sm">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 
            hover:text-slate-100 hover:bg-surface-bright transition-all
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <span className="shrink-0 text-lg">{isCollapsed ? '→' : '←'}</span>
          {!isCollapsed && <span className="font-medium text-sm">Hide Sidebar</span>}
        </button>
      </div>
    </aside>
  );
});
