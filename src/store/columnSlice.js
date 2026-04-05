import { generateId } from '@/lib/id';

export const createColumnSlice = (set) => ({
  columns: {}, // Record<string, Column>

  addColumn: (boardId, title, color = '#64748b') => {
    const columnId = generateId('column');
    
    set((state) => {
      state.columns[columnId] = {
        id: columnId,
        boardId,
        title,
        color,
        taskIds: [], // IDs of tasks in this column
        createdAt: Date.now(),
      };

      // Register in board
      if (state.boards[boardId]) {
        state.boards[boardId].columnOrder.push(columnId);
        state.boards[boardId].updatedAt = Date.now();
      }
    });

    return columnId;
  },

  updateColumn: (id, changes) => {
    set((state) => {
      if (state.columns[id]) {
        state.columns[id] = {
          ...state.columns[id],
          ...changes,
        };
        
        // Update board updatedAt
        const boardId = state.columns[id].boardId;
        if (state.boards[boardId]) {
          state.boards[boardId].updatedAt = Date.now();
        }
      }
    });
  },

  deleteColumn: (id) => {
    set((state) => {
      const column = state.columns[id];
      if (!column) return;

      const boardId = column.boardId;

      // Cascade delete tasks
      column.taskIds.forEach((taskId) => {
        delete state.tasks[taskId];
      });

      // Remove from board's columnOrder
      if (state.boards[boardId]) {
        state.boards[boardId].columnOrder = state.boards[boardId].columnOrder.filter(
          (cid) => cid !== id
        );
        state.boards[boardId].updatedAt = Date.now();
      }

      // Remove column
      delete state.columns[id];
    });
  },

  reorderColumns: (boardId, newOrder) => {
    set((state) => {
      if (state.boards[boardId]) {
        state.boards[boardId].columnOrder = newOrder;
        state.boards[boardId].updatedAt = Date.now();
      }
    });
  },
});
