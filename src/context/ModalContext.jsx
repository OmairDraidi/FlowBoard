import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(undefined);

/**
 * Modal Provider for global task modal state.
 * Prevents prop-drilling task selection state.
 */
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const openTaskModal = useCallback((taskId) => {
    setSelectedTaskId(taskId);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing taskId to prevent flicker during exit animation
    setTimeout(() => setSelectedTaskId(null), 200);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, selectedTaskId, openTaskModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
