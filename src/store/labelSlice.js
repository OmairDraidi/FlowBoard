import { generateId } from '@/lib/id';

export const createLabelSlice = (set, get) => ({
  labels: {}, // Record<string, Label>

  addLabel: (boardId, name, color) => {
    const labelId = generateId('label');

    set((state) => {
      state.labels[labelId] = {
        id: labelId,
        boardId,
        name,
        color,
      };

      // Add to board
      if (state.boards[boardId]) {
        state.boards[boardId].labelIds.push(labelId);
        state.boards[boardId].updatedAt = Date.now();
      }
    });

    return labelId;
  },

  updateLabel: (id, changes) => {
    set((state) => {
      if (state.labels[id]) {
        state.labels[id] = {
          ...state.labels[id],
          ...changes,
        };

        // Update board updatedAt
        const boardId = state.labels[id].boardId;
        if (state.boards[boardId]) {
          state.boards[boardId].updatedAt = Date.now();
        }
      }
    });
  },

  deleteLabel: (id) => {
    set((state) => {
      const label = state.labels[id];
      if (!label) return;

      const boardId = label.boardId;

      // Remove from board's labelIds
      if (state.boards[boardId]) {
        state.boards[boardId].labelIds = state.boards[boardId].labelIds.filter(
          (lid) => lid !== id
        );
        state.boards[boardId].updatedAt = Date.now();
      }

      // Remove from all tasks that use it
      Object.values(state.tasks).forEach((task) => {
        if (task.boardId === boardId) {
          task.labelIds = task.labelIds.filter((lid) => lid !== id);
        }
      });

      // Remove label
      delete state.labels[id];
    });
  },
});
