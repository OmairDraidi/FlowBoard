import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useShallow } from 'zustand/react/shallow';
import { useBoardStore } from '@/store';
import { createPortal } from 'react-dom';
import { TaskCard } from '@/features/task/components/TaskCard';
import { Column } from '@/features/column/components/Column';

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

/**
 * BoardDndContext component.
 * Orchestrates all drag and drop logic for the board.
 */
export function BoardDndContext({ children }) {
  const [activeId, setActiveId] = useState(null);
  const [activeType, setActiveType] = useState(null); // 'task' | 'column'

  const { 
    activeBoardId, 
    boards, 
    columns, 
    tasks, 
    moveTask, 
    reorderTasks, 
    reorderColumns 
  } = useBoardStore(
    useShallow((s) => ({
      activeBoardId: s.activeBoardId,
      boards: s.boards,
      columns: s.columns,
      tasks: s.tasks,
      moveTask: s.moveTask,
      reorderTasks: s.reorderTasks,
      reorderColumns: s.reorderColumns,
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid accidental drags on clicks
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    setActiveType(active.data.current?.type);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const type = active.data.current?.type;
    if (type !== 'task') return;

    const activeTask = tasks[activeId];
    const overData = over.data.current;

    // Find destination column
    let overColumnId;
    if (overData?.type === 'column') {
      overColumnId = overId;
    } else if (overData?.type === 'task') {
      overColumnId = overData.columnId;
    }

    if (!overColumnId || overColumnId === activeTask.columnId) return;

    // Optimistic move task across columns
    const overColumn = columns[overColumnId];
    const overIndex = overData?.type === 'task' 
      ? overColumn.taskIds.indexOf(overId)
      : overColumn.taskIds.length;

    moveTask(activeId, activeTask.columnId, overColumnId, overIndex);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveType(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const type = active.data.current?.type;

    if (type === 'column') {
      const activeBoard = boards[activeBoardId];
      const oldIndex = activeBoard.columnOrder.indexOf(activeId);
      const newIndex = activeBoard.columnOrder.indexOf(overId);
      
      const newOrder = arrayMove(activeBoard.columnOrder, oldIndex, newIndex);
      reorderColumns(activeBoardId, newOrder);
    } else if (type === 'task') {
      const activeTask = tasks[activeId];
      const column = columns[activeTask.columnId];
      const oldIndex = column.taskIds.indexOf(activeId);
      
      const overData = over.data.current;
      const newIndex = overData?.type === 'task' 
        ? column.taskIds.indexOf(overId)
        : column.taskIds.length;

      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(column.taskIds, oldIndex, newIndex);
        reorderTasks(activeTask.columnId, newOrder);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      
      {createPortal(
        <DragOverlay dropAnimation={dropAnimation}>
          {activeId ? (
            activeType === 'task' ? (
              <div className="rotate-3 active:cursor-grabbing">
                <TaskCard taskId={activeId} />
              </div>
            ) : (
              <div className="rotate-2 active:cursor-grabbing h-full">
                <Column column={columns[activeId]} />
              </div>
            )
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
