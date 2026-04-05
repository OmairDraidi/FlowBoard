import { generateId } from '@/lib/id';
import { DEFAULT_COLUMNS } from '@/lib/constants';

export const createBoardSlice = (set, get) => ({
  boards: {}, // Record<string, Board>
  activeBoardId: null,

  addBoard: (title) => {
    const boardId = generateId('board');
    const now = Date.now();

    set((state) => {
      state.boards[boardId] = {
        id: boardId,
        title,
        columnOrder: [], // IDs of columns
        labelIds: [], // IDs of labels belonging to this board
        createdAt: now,
        updatedAt: now,
      };
      state.activeBoardId = boardId;
    });

    // Auto-create default columns
    DEFAULT_COLUMNS.forEach((col) => {
      get().addColumn(boardId, col.title, col.color);
    });

    return boardId;
  },

  updateBoard: (id, changes) => {
    set((state) => {
      if (state.boards[id]) {
        state.boards[id] = {
          ...state.boards[id],
          ...changes,
          updatedAt: Date.now(),
        };
      }
    });
  },

  deleteBoard: (id) => {
    set((state) => {
      const board = state.boards[id];
      if (!board) return;

      // Cascade delete columns
      board.columnOrder.forEach((colId) => {
        const column = state.columns[colId];
        if (column) {
          // Cascade delete tasks in column
          column.taskIds.forEach((taskId) => {
            delete state.tasks[taskId];
          });
          delete state.columns[colId];
        }
      });

      // Cascade delete labels
      board.labelIds.forEach((labelId) => {
        delete state.labels[labelId];
      });

      // Remove board
      delete state.boards[id];

      // Switch active board if deleted was active
      if (state.activeBoardId === id) {
        const remainingBoardIds = Object.keys(state.boards);
        state.activeBoardId = remainingBoardIds.length > 0 ? remainingBoardIds[0] : null;
      }
    });
  },

  setActiveBoard: (id) => {
    set((state) => {
      state.activeBoardId = id;
    });
  },
});
