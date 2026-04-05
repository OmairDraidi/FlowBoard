import { useEffect } from 'react';
import { useBoardStore } from '@/store';
import { useModal } from '@/context/ModalContext';
import { useFilters } from '@/context/FilterContext';

/**
 * Custom hook to manage global keyboard shortcuts.
 * B: Toggle Sidebar collapse
 * N: Create new Task (opens modal)
 * Escape: Close modals or Clear filters
 */
export function useKeyboardShortcuts(onToggleSidebar) {
  const activeBoardId = useBoardStore((s) => s.activeBoardId);
  const { openTaskModal, closeTaskModal, selectedTaskId } = useModal();
  const { clearFilters, hasActiveFilters } = useFilters();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const isInput = event.target.tagName === 'INPUT' || 
                    event.target.tagName === 'TEXTAREA' || 
                    event.target.isContentEditable;
      
      if (isInput && event.key !== 'Escape') return;

      switch (event.key.toLowerCase()) {
        case 'b':
          // Toggle Sidebar
          if (onToggleSidebar) {
            event.preventDefault();
            onToggleSidebar();
          }
          break;

        case 'n':
          // Create New Task
          if (activeBoardId) {
            event.preventDefault();
            openTaskModal(); // Opens empty modal for creation
          }
          break;

        case 'escape':
          // Priority 1: Close Modal
          if (selectedTaskId !== undefined) {
             event.preventDefault();
             closeTaskModal();
             return;
          }
          // Priority 2: Clear Filters
          if (hasActiveFilters) {
            event.preventDefault();
            clearFilters();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeBoardId, 
    onToggleSidebar, 
    openTaskModal, 
    closeTaskModal, 
    selectedTaskId, 
    hasActiveFilters, 
    clearFilters
  ]);
}
