# FlowBoard — Phase 9: Sub-Tasks & Checklists
# Status: Not Started
# Last Updated: 2026-04-08

## Overview

Add a sub-task / checklist system to tasks. Users can break tasks into smaller steps, track progress visually, and manage individual items with toggle, edit, delete, and reorder capabilities.

---

## Step-by-Step Plan

### Step 1: Create `subtaskSlice.js`
**Estimated effort: ~30 min**

- [ ] Create `src/store/subtaskSlice.js`
- [ ] Implement `subtasks: {}` (Record<string, Subtask>)
- [ ] Implement `addSubtask(taskId, title)`:
  - Generate ID with `generateId('subtask')`
  - Create subtask object `{ id, taskId, boardId, title, isCompleted: false, createdAt }`
  - Append ID to `state.tasks[taskId].subtaskIds`
  - Update board `updatedAt`
- [ ] Implement `updateSubtask(id, changes)`:
  - Update subtask fields
  - Update parent board `updatedAt`
- [ ] Implement `deleteSubtask(id)`:
  - Remove from `state.tasks[taskId].subtaskIds`
  - Delete subtask from `state.subtasks`
  - Update board `updatedAt`
- [ ] Implement `toggleSubtask(id)`:
  - Flip `isCompleted`
  - Update parent task `updatedAt`
- [ ] Implement `reorderSubtasks(taskId, newIds)`:
  - Set `state.tasks[taskId].subtaskIds = newIds`

---

### Step 2: Update `taskSlice.js`
**Estimated effort: ~15 min**

- [ ] Add `subtaskIds: []` to default task creation in `addTask`
- [ ] Add cascade delete in `deleteTask`:
  ```js
  task.subtaskIds.forEach((subtaskId) => {
    delete state.subtasks[subtaskId];
  });
  ```

---

### Step 3: Integrate into Store (`index.js`)
**Estimated effort: ~20 min**

- [ ] Import and spread `createSubtaskSlice` in the combined store
- [ ] Bump `version` from 1 to 2
- [ ] Add `migrate` function:
  ```js
  migrate: (persistedState, version) => {
    if (version < 2) {
      persistedState.subtasks = {};
      Object.values(persistedState.tasks || {}).forEach(task => {
        if (!task.subtaskIds) task.subtaskIds = [];
      });
    }
    return persistedState;
  }
  ```
- [ ] Add selectors:
  - `selectTaskSubtasks(state, taskId)` → ordered subtask objects
  - `selectTaskProgress(state, taskId)` → `{ completed, total, percentage }`

---

### Step 4: Build `ChecklistProgress.jsx`
**Estimated effort: ~20 min**

- [ ] Create `src/features/subtask/components/ChecklistProgress.jsx`
- [ ] Accepts `completed`, `total` props
- [ ] Renders a horizontal progress bar with:
  - Background: `bg-surface-bright`
  - Fill: gradient from slate → indigo → green (based on %)
  - Text: `"3/7 completed"` or `"All done! ✅"` at 100%
  - Smooth width transition (300ms)
- [ ] `React.memo` wrapped

---

### Step 5: Build `ChecklistItem.jsx`
**Estimated effort: ~30 min**

- [ ] Create `src/features/subtask/components/ChecklistItem.jsx`
- [ ] Accepts `subtask`, `onToggle`, `onUpdate`, `onDelete` props
- [ ] Renders:
  - Custom checkbox with Framer Motion scale animation
  - Title with `line-through` and muted color when completed
  - Click on title → inline edit mode (Input component)
  - Delete button (×) visible on hover with fade-in
- [ ] Keyboard support: Enter to save edit, Escape to cancel
- [ ] `React.memo` wrapped

---

### Step 6: Build `Checklist.jsx`
**Estimated effort: ~30 min**

- [ ] Create `src/features/subtask/components/Checklist.jsx`
- [ ] Accepts `taskId` prop
- [ ] Reads subtasks from store via `selectTaskSubtasks`
- [ ] Renders:
  - Section header: `"CHECKLIST"` in uppercase tracking-widest style
  - `<ChecklistProgress />` at top (if subtasks exist)
  - List of `<ChecklistItem />` components
  - Quick-add input at bottom (like QuickAdd pattern):
    - Placeholder: `"Add a checklist item..."`
    - Enter to create, stay in adding mode for rapid entry
    - Escape to close
- [ ] Connect store actions: `addSubtask`, `toggleSubtask`, `updateSubtask`, `deleteSubtask`

---

### Step 7: Integrate into `TaskForm.jsx`
**Estimated effort: ~15 min**

- [ ] Import `Checklist` component
- [ ] Add `<Checklist taskId={taskId} />` between Description and Label sections
- [ ] Ensure proper spacing and visual separation

---

### Step 8: Update `TaskCard.jsx`
**Estimated effort: ~20 min**

- [ ] Import `selectTaskProgress` selector
- [ ] Read progress: `useBoardStore((s) => selectTaskProgress(s, taskId))`
- [ ] Conditionally render mini progress indicator (only if `total > 0`):
  - Thin progress bar (2px height)
  - Text: `"✅ 3/7"` in small font
  - Green tint on card border when 100% complete
- [ ] Position: between title and footer

---

### Step 9: Update `constants.js`
**Estimated effort: ~5 min**

- [ ] Add `CHECKLIST_COLORS`:
  ```js
  export const CHECKLIST_COLORS = {
    empty: '#64748b',      // slate
    inProgress: '#818cf8', // indigo
    complete: '#22c55e',   // green
  };
  ```

---

### Step 10: Polish & Test
**Estimated effort: ~30 min**

- [ ] Test add/toggle/edit/delete subtask flows
- [ ] Test cascade delete (delete task → subtasks removed)
- [ ] Test migration (old localStorage without subtasks → app loads fine)
- [ ] Test progress indicators on TaskCard
- [ ] Test responsive layout in TaskModal
- [ ] Run `npm run build` — verify no errors
- [ ] Run `npm run lint` — fix any issues

---

## Acceptance Criteria

- [ ] User can add checklist items to any task
- [ ] Checking an item shows animated checkmark + strikethrough text
- [ ] Progress bar updates in real-time when items are toggled
- [ ] TaskCard shows mini progress `(✅ 3/7)` for tasks with subtasks
- [ ] Deleting a task cascades to delete all its subtasks
- [ ] Data persists across page refresh
- [ ] Old saved data (v1) migrates cleanly to v2 schema
- [ ] No infinite loops, no console errors
- [ ] Responsive on mobile and desktop

---

## Files Changed Summary

| Action | File |
|--------|------|
| NEW | `src/store/subtaskSlice.js` |
| NEW | `src/features/subtask/components/Checklist.jsx` |
| NEW | `src/features/subtask/components/ChecklistItem.jsx` |
| NEW | `src/features/subtask/components/ChecklistProgress.jsx` |
| MODIFY | `src/store/index.js` |
| MODIFY | `src/store/taskSlice.js` |
| MODIFY | `src/features/task/components/TaskForm.jsx` |
| MODIFY | `src/features/task/components/TaskCard.jsx` |
| MODIFY | `src/lib/constants.js` |
