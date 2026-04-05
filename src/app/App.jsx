import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { ModalProvider } from '@/context/ModalContext';
import { FilterProvider } from '@/context/FilterContext';
import { Layout } from './Layout';
import { useBoardStore } from '@/store';
import { selectActiveBoard } from '@/store/index';
import { BoardView } from '@/features/board/components/BoardView';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TaskDetailModal } from '@/features/task/components/TaskDetailModal';

/**
 * Root Application Component.
 * Orchestrates global providers and the core layout.
 */
export function App() {
  const activeBoard = useBoardStore(selectActiveBoard);
  const addBoard = useBoardStore((s) => s.addBoard);

  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      addBoard(newBoardName.trim());
      setNewBoardName('');
      setIsCreating(false);
    }
  };

  return (
    <ThemeProvider>
      <FilterProvider>
        <ModalProvider>
          <Layout>
            {!activeBoard ? (
              <div className="flex items-center justify-center p-12 h-full">
                <EmptyState
                  title="Welcome to FlowBoard"
                  description="Start by creating your first board to organize your tasks and projects."
                  icon={() => <span className="text-4xl">🚀</span>}
                  action={
                    isCreating ? (
                      <div className="flex flex-col gap-3 items-center w-full max-w-xs animate-in fade-in zoom-in-95 duration-200">
                        <Input 
                          autoFocus
                          placeholder="My New Board..."
                          value={newBoardName}
                          onChange={(e) => setNewBoardName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateBoard();
                            if (e.key === 'Escape') setIsCreating(false);
                          }}
                          className="!w-full !text-center !text-lg !py-3 !font-semibold !bg-surface-bright/50 !border-indigo-500/50 focus:!border-indigo-400"
                        />
                        <div className="flex gap-2">
                           <Button variant="primary" size="sm" onClick={handleCreateBoard}>Create</Button>
                           <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="md" 
                        onClick={() => setIsCreating(true)}
                      >
                        Create Your First Board
                      </Button>
                    )
                  }
                />
              </div>
            ) : (
              <BoardView />
            )}
            
            {/* Global Task Modal */}
            <TaskDetailModal />
          </Layout>
        </ModalProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
