# Plan: Phase 2 — Zustand Store
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Build the complete Zustand store with normalized domain state, CRUD actions for all entities, Immer middleware for immutable updates, and persist middleware for localStorage. This is the data backbone of the entire app.

## Implementation Steps

### Step 1: Board Slice (`store/boardSlice.js`)

**State:**
```js
boards: {},          // Record<string, Board>
activeBoardId: null  // string | null
```

**Actions:**
- `addBoard(title)` → create board with nanoid, set as active, auto-create 3 default columns
- `updateBoard(id, changes)` → merge changes, update `updatedAt`
- `deleteBoard(id)` → cascade delete columns + tasks + labels, switch active to next board
- `setActiveBoard(id)` → set `activeBoardId`

### Step 2: Column Slice (`store/columnSlice.js`)

**State:**
```js
columns: {}  // Record<string, Column>
```

**Actions:**
- `addColumn(boardId, title)` → create column, auto-assign color, append to board.columnOrder
- `updateColumn(id, changes)` → merge changes
- `deleteColumn(id)` → cascade delete tasks, remove from board.columnOrder
- `reorderColumns(boardId, newOrder)` → replace board.columnOrder

### Step 3: Task Slice (`store/taskSlice.js`)

**State:**
```js
tasks: {}  // Record<string, Task>
```

**Actions:**
- `addTask(columnId, title)` → create task with defaults, append to column.taskIds
- `updateTask(id, changes)` → merge changes, update `updatedAt`
- `deleteTask(id)` → remove from column.taskIds, delete from tasks map
- `moveTask(taskId, fromColId, toColId, newIndex)` → remove from source, insert in target, update task.columnId

### Step 4: Label Slice (`store/labelSlice.js`)

**State:**
```js
labels: {}  // Record<string, Label>
```

**Actions:**
- `addLabel(boardId, name, color)` → create label, add to board.labelIds
- `updateLabel(id, changes)` → merge changes
- `deleteLabel(id)` → remove from board.labelIds, remove from all tasks' labelIds

### Step 5: Combine Store (`store/index.js`)

```js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createBoardSlice } from './boardSlice';
import { createColumnSlice } from './columnSlice';
import { createTaskSlice } from './taskSlice';
import { createLabelSlice } from './labelSlice';

export const useBoardStore = create(
  persist(
    immer((...args) => ({
      ...createBoardSlice(...args),
      ...createColumnSlice(...args),
      ...createTaskSlice(...args),
      ...createLabelSlice(...args),
    })),
    {
      name: 'flowboard-store',
      version: 1,
      // Custom debounced storage adapter
    }
  )
);
```

### Step 6: Persistence Configuration

- Debounced writes (300ms) to avoid thrashing during drag operations
- `version` field for future schema migrations
- `migrate` function placeholder
- Error handling for `QuotaExceededError`

### Step 7: Seed Data

On first visit (no localStorage data):
- Create "My First Board" with columns: Backlog, In Progress, Done
- Create 2-3 sample tasks
- Create default labels: Bug (red), Feature (blue), Improvement (green)

## Acceptance Criteria

- [ ] All CRUD actions work correctly
- [ ] Cascade deletes properly clean up references
- [ ] `moveTask` transfers task between columns at correct index
- [ ] Data persists across page refresh
- [ ] Seed data appears on first visit
- [ ] No orphaned references after any delete operation

## Testing Strategy

- Manual testing via browser console: `useBoardStore.getState()`
- Verify localStorage contents in DevTools → Application tab
- Test cascade: delete board → check columns/tasks/labels are gone
