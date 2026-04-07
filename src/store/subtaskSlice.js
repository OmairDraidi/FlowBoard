import { generateId } from '@/lib/id';

export const createSubtaskSlice = (set, get) => ({
  subtasks: {}, // Record<string, Subtask>

  addSubtask: (taskId, title) => {
    const subtaskId = generateId('subtask');
    const now = Date.now();

    set((state) => {
      const task = state.tasks[taskId];
      if (!task) return;

      state.subtasks[subtaskId] = {
        id: subtaskId,
        taskId,
        boardId: task.boardId,
        title,
        isCompleted: false,
        createdAt: now,
      };

      // Ensure subtaskIds exist (for migration safety)
      if (!task.subtaskIds) task.subtaskIds = [];
      task.subtaskIds.push(subtaskId);

      // Update timestamps
      task.updatedAt = now;
      if (state.boards[task.boardId]) {
        state.boards[task.boardId].updatedAt = now;
      }
    });

    return subtaskId;
  },

  updateSubtask: (id, changes) => {
    set((state) => {
      const subtask = state.subtasks[id];
      if (subtask) {
        state.subtasks[id] = {
          ...subtask,
          ...changes,
        };

        // Update task and board timestamps
        const task = state.tasks[subtask.taskId];
        if (task) {
          task.updatedAt = Date.now();
          if (state.boards[task.boardId]) {
            state.boards[task.boardId].updatedAt = Date.now();
          }
        }
      }
    });
  },

  deleteSubtask: (id) => {
    set((state) => {
      const subtask = state.subtasks[id];
      if (!subtask) return;

      const task = state.tasks[subtask.taskId];
      if (task && task.subtaskIds) {
        task.subtaskIds = task.subtaskIds.filter((sid) => sid !== id);
        task.updatedAt = Date.now();
      }

      // Update board timestamp
      if (state.boards[subtask.boardId]) {
        state.boards[subtask.boardId].updatedAt = Date.now();
      }

      delete state.subtasks[id];
    });
  },

  toggleSubtask: (id) => {
    set((state) => {
      const subtask = state.subtasks[id];
      if (subtask) {
        subtask.isCompleted = !subtask.isCompleted;

        // Update timestamps
        const task = state.tasks[subtask.taskId];
        if (task) {
          task.updatedAt = Date.now();
          if (state.boards[task.boardId]) {
            state.boards[task.boardId].updatedAt = Date.now();
          }
        }
      }
    });
  },

  reorderSubtasks: (taskId, newIds) => {
    set((state) => {
      if (state.tasks[taskId]) {
        state.tasks[taskId].subtaskIds = newIds;
        state.tasks[taskId].updatedAt = Date.now();

        const boardId = state.tasks[taskId].boardId;
        if (state.boards[boardId]) {
          state.boards[boardId].updatedAt = Date.now();
        }
      }
    });
  },
});
