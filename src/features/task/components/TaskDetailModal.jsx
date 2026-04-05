import { memo } from 'react';
import { useModal } from '@/context/ModalContext';
import { Modal } from '@/components/ui/Modal';
import { TaskForm } from './TaskForm';

/**
 * Task Detail Modal component.
 * Wrapper and Modal coordination for the TaskForm.
 */
export const TaskDetailModal = memo(function TaskDetailModal() {
  const { isOpen, selectedTaskId, closeModal } = useModal();

  if (!selectedTaskId) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Task Details"
    >
      <TaskForm key={selectedTaskId} taskId={selectedTaskId} onClose={closeModal} />
    </Modal>
  );
});
