import { memo, useMemo } from 'react';
import { useBoardStore } from '@/store';
import { useFilters } from '@/context/FilterContext';
import { ColumnHeader } from './ColumnHeader';
import { SortableTask } from '@/features/task/components/SortableTask';
import { QuickAdd } from '@/features/task/components/QuickAdd';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

/**
 * Column component.
 * Acts as a container for column header and task list.
 * Applies global filters to determine which tasks to render.
 */
export const Column = memo(function Column({ column, dragHandleProps }) {
  const { searchQuery, priorityFilters, labelFilters, hasActiveFilters } = useFilters();
  const allTasks = useBoardStore((s) => s.tasks);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id,
    },
  });

  // Filter tasks based on global search and selective filters
  const filteredTaskIds = useMemo(() => {
    return column.taskIds.filter((taskId) => {
      const task = allTasks[taskId];
      if (!task) return false;

      // 1. Search Query Filter (Title or Description)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // 2. Priority Filter (OR logic within the category)
      if (priorityFilters.length > 0) {
        if (!priorityFilters.includes(task.priority)) return false;
      }

      // 3. Label Filter (OR logic within the category)
      if (labelFilters.length > 0) {
        const hasMatchingLabel = task.labelIds.some(id => labelFilters.includes(id));
        if (!hasMatchingLabel) return false;
      }

      return true;
    });
  }, [column.taskIds, allTasks, searchQuery, priorityFilters, labelFilters]);

  return (
    <div className="flex flex-col shrink-0 w-[280px] h-full group/column">
      <ColumnHeader column={column} dragHandleProps={dragHandleProps} />
      
      {/* Task List Area */}
      <div 
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar min-h-0 pb-4"
      >
        <SortableContext
          items={filteredTaskIds}
          strategy={verticalListSortingStrategy}
        >
          {filteredTaskIds.map((taskId) => (
            <SortableTask key={taskId} taskId={taskId} columnId={column.id} />
          ))}
        </SortableContext>

        {/* Local Empty State for filtered results */}
        {hasActiveFilters && filteredTaskIds.length === 0 && column.taskIds.length > 0 && (
          <div className="py-8 px-4 text-center border border-dashed border-slate-700/50 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
            <p className="text-xs text-slate-500 font-medium whitespace-normal">
              No tasks match your current filters in this column.
            </p>
          </div>
        )}
        
        {!hasActiveFilters && column.taskIds.length === 0 && (
          <div className="py-8 px-4 text-center border border-dashed border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-600 font-medium">
              No tasks yet.
            </p>
          </div>
        )}

        <QuickAdd columnId={column.id} />
      </div>
    </div>
  );
});
