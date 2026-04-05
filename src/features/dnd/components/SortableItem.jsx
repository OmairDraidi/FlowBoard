import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * SortableItem component.
 * Atomic wrapper for dnd-kit's sortable functionality.
 */
export function SortableItem({ id, data, children, disabled = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id, 
    data,
    disabled
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return children({
    setNodeRef,
    attributes,
    listeners,
    style,
    isDragging,
  });
}
