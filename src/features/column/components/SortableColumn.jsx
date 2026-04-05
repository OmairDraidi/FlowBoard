import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column } from './Column';

/**
 * SortableColumn component.
 * Wrapper that makes a Column horizontally draggable.
 */
export function SortableColumn({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id,
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
        className="opacity-40 grayscale-50 scale-95 h-full"
      >
        <Column column={column} />
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="h-full"
    >
      <Column column={column} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}
