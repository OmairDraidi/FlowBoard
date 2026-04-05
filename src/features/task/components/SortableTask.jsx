import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';

/**
 * SortableTask component.
 * Wrapper that makes a TaskCard draggable.
 */
export function SortableTask({ taskId, columnId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: {
      type: 'task',
      taskId,
      columnId,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className="opacity-40 grayscale-50 scale-95"
      >
        <TaskCard taskId={taskId} />
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="active:cursor-grabbing"
    >
      <TaskCard taskId={taskId} />
    </div>
  );
}
