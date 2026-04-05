import { generateId } from '@/lib/id';
import { PRIORITIES } from '@/lib/constants';

export const createTaskSlice = (set, get) => ({
  tasks: {}, // Record<string, Task>

  addTask: (columnId, title, description = '') => {
    const taskId = generateId('task');
    const now = Date.now();

    set((state) => {
      const column = state.columns[columnId];
      if (!column) return;

      state.tasks[taskId] = {
        id: taskId,
        columnId,
        boardId: column.boardId,
        title,
        description,
        priority: PRIORITIES.NONE,
        labelIds: [],
        dueDate: null,
        createdAt: now,
        updatedAt: now,
      };

      // Register in column
      column.taskIds.push(taskId);
      
      // Update board updatedAt
      if (state.boards[column.boardId]) {
        state.boards[column.boardId].updatedAt = now;
      }
    });

    return taskId;
  },

  updateTask: (id, changes) => {
    set((state) => {
      if (state.tasks[id]) {
        const task = state.tasks[id];
        state.tasks[id] = {
          ...task,
          ...changes,
          updatedAt: Date.now(),
        };

        // Update board updatedAt
        if (state.boards[task.boardId]) {
          state.boards[task.boardId].updatedAt = Date.now();
        }
      }
    });
  },

  deleteTask: (id) => {
    set((state) => {
      const task = state.tasks[id];
      if (!task) return;

      const column = state.columns[task.columnId];
      if (column) {
        column.taskIds = column.taskIds.filter((tid) => tid !== id);
      }

      // Update board updatedAt
      if (state.boards[task.boardId]) {
        state.boards[task.boardId].updatedAt = Date.now();
      }

      delete state.tasks[id];
    });
  },

  moveTask: (taskId, fromColId, toColId, newIndex) => {
    set((state) => {
      const task = state.tasks[taskId];
      const sourceCol = state.columns[fromColId];
      const targetCol = state.columns[toColId];

      if (!task || !sourceCol || !targetCol) return;

      // Remove from source
      sourceCol.taskIds = sourceCol.taskIds.filter((tid) => tid !== taskId);

      // Insert into target
      targetCol.taskIds.splice(newIndex, 0, taskId);

      // Update task's column reference
      task.columnId = toColId;
      task.updatedAt = Date.now();

      // Update board updatedAt
      if (state.boards[task.boardId]) {
        state.boards[task.boardId].updatedAt = Date.now();
      }
    });
  },

  reorderTasks: (columnId, newIds) => {
    set((state) => {
      if (state.columns[columnId]) {
        state.columns[columnId].taskIds = newIds;
        
        const boardId = state.columns[columnId].boardId;
        if (state.boards[boardId]) {
          state.boards[boardId].updatedAt = Date.now();
        }
      }
    });
  },
});
