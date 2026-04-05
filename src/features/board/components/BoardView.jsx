import { memo } from 'react';
import { useBoardStore } from '@/store';
import { selectActiveBoard } from '@/store/index';
import { SortableColumn } from '@/features/column/components/SortableColumn';
import { AddColumn } from '@/features/column/components/AddColumn';
import { BoardDndContext } from './BoardDndContext';
import { FilterBar } from '@/features/filter/components/FilterBar';
import { 
  SortableContext, 
  horizontalListSortingStrategy 
} from '@dnd-kit/sortable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

/**
 * Main Board View component.
 * Layout for board columns horizontally.
 * Includes DND context for reordering and FilterBar for visibility.
 */
export const BoardView = memo(function BoardView() {
  const board = useBoardStore(selectActiveBoard);
  const columnsMap = useBoardStore((s) => s.columns);
  const addColumn = useBoardStore((s) => s.addColumn);

  if (!board) return null;

  const columnOrder = board.columnOrder;

  return (
    <BoardDndContext>
      <div className="flex-1 flex flex-col min-h-0 bg-surface-base h-full">
        {/* Filter Toolbar */}
        <FilterBar />

        {/* Columns Scroll Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div className="flex gap-6 h-full p-6 min-w-max items-start">
            <SortableContext 
              items={columnOrder} 
              strategy={horizontalListSortingStrategy}
            >
              {columnOrder.map((columnId) => {
                const column = columnsMap[columnId];
                if (!column) return null;
                return (
                  <SortableColumn 
                    key={column.id} 
                    column={column} 
                  />
                );
              })}
            </SortableContext>

            <AddColumn boardId={board.id} />
          </div>

          {columnOrder.length === 0 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
              <EmptyState
                title="This board is empty"
                description="Columns help you organize tasks by category or progress."
                icon={() => <span className="text-3xl">🏗️</span>}
                action={
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => addColumn(board.id, 'New Column')}
                  >
                    Create Your First Column
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>
    </BoardDndContext>
  );
});
