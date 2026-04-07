import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createBoardSlice } from './boardSlice';
import { createColumnSlice } from './columnSlice';
import { createTaskSlice } from './taskSlice';
import { createLabelSlice } from './labelSlice';
import { createSubtaskSlice } from './subtaskSlice';

/**
 * FlowBoard Root Store
 * Uses Immer for easy nested updates and Persist for localStorage.
 */

const EMPTY_SUBTASKS = [];
const EMPTY_PROGRESS = { completed: 0, total: 0, percentage: 0 };

export const useBoardStore = create(
  persist(
    immer((...args) => ({
      ...createBoardSlice(...args),
      ...createColumnSlice(...args),
      ...createTaskSlice(...args),
      ...createLabelSlice(...args),
      ...createSubtaskSlice(...args),
    })),
    {
      name: 'flowboard-storage',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version === 1) {
          // Add subtasks object if it doesn't exist
          if (!persistedState.subtasks) {
            persistedState.subtasks = {};
          }
          // Add subtaskIds to all existing tasks
          Object.values(persistedState.tasks || {}).forEach((task) => {
            if (!task.subtaskIds) {
              task.subtaskIds = [];
            }
          });
        }
        return persistedState;
      },
      onRehydrateStorage: () => {
        return (hydratedState, error) => {
          if (error) {
            console.error('An error occurred during hydration', error);
          } else {
            // Seed the store if absolutely empty
            if (!hydratedState || Object.keys(hydratedState.boards).length === 0) {
              hydratedState.addBoard('🚀 Product Roadmap');
              
              // Find the newly created board
              const boardId = hydratedState.activeBoardId;
              const columns = Object.values(hydratedState.columns).filter(c => c.boardId === boardId);
              
              // Seed some sample tasks in the first column (Backlog)
              const firstCol = columns.find(c => c.title === 'Backlog');
              if (firstCol) {
                hydratedState.addTask(firstCol.id, 'Design system token audit', 'Audit all colors and spacing tokens for WCAG accessibility.');
                hydratedState.addTask(firstCol.id, 'Set up CI/CD pipeline', 'Configure GitHub Actions for automated testing and deployment.');
              }

              // Seed some sample tasks in the second column (In Progress)
              const secondCol = columns.find(c => c.title === 'In Progress');
              if (secondCol) {
                hydratedState.addTask(secondCol.id, 'Implement drag-and-drop', 'Use @dnd-kit to enable column and task sorting.');
              }
            }
          }
        };
      },
    }
  )
);

// --- Selectors ---

/**
 * Returns the currently active board object.
 */
export const selectActiveBoard = (state) => {
  if (!state.activeBoardId) return null;
  return state.boards[state.activeBoardId] || null;
};

/**
 * Returns the columns for the active board in order.
 */
export const selectActiveBoardColumns = (state) => {
  const board = selectActiveBoard(state);
  if (!board) return [];
  return board.columnOrder.map((id) => state.columns[id]).filter(Boolean);
};

/**
 * Returns tasks for a specific column in order.
 */
export const selectTasksByColumn = (state, columnId) => {
  const column = state.columns[columnId];
  if (!column) return [];
  return column.taskIds.map((id) => state.tasks[id]).filter(Boolean);
};

/**
 * Returns all labels belonging to the active board.
 */
export const selectActiveBoardLabels = (state) => {
  const board = selectActiveBoard(state);
  if (!board) return [];
  return board.labelIds.map((id) => state.labels[id]).filter(Boolean);
};

/**
 * Returns subtasks for a specific task in order.
 */
export const selectSubtasksByTask = (state, taskId) => {
  const task = state.tasks[taskId];
  if (!task || !task.subtaskIds || task.subtaskIds.length === 0) return EMPTY_SUBTASKS;
  return task.subtaskIds.map((id) => state.subtasks[id]).filter(Boolean);
};

/**
 * Returns progress data for a specific task.
 */
export const selectTaskProgress = (state, taskId) => {
  const task = state.tasks[taskId];
  if (!task || !task.subtaskIds || task.subtaskIds.length === 0) {
    return EMPTY_PROGRESS;
  }

  const subtasks = task.subtaskIds.map((id) => state.subtasks[id]).filter(Boolean);
  const total = subtasks.length;
  const completed = subtasks.filter((s) => s.isCompleted).length;
  const percentage = Math.round((completed / total) * 100);

  return { completed, total, percentage };
};
