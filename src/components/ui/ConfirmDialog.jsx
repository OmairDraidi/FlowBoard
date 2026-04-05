import { memo } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

/**
 * ConfirmDialog component for destructive actions
 * Displays a warning message and provides Confirm/Cancel options.
 */
export const ConfirmDialog = memo(function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="space-y-6">
        <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onCancel} size="md">
            {cancelText}
          </Button>
          <Button 
            variant={variant} 
            onClick={() => {
              onConfirm();
              onCancel();
            }} 
            size="md"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
});
