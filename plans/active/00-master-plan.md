# FlowBoard — Master Implementation Plan
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Phased implementation plan for FlowBoard. Each phase builds on the previous one. Features are ordered by dependency — foundation first, polish last.

---

## Phase 1: Project Setup & Foundation
**Estimated effort: ~1 session**

- [ ] Step 1: Initialize Vite + React 18 project
- [ ] Step 2: Install dependencies (tailwind, zustand, @dnd-kit, framer-motion, date-fns, nanoid)
- [ ] Step 3: Configure Tailwind (dark mode: 'class', custom theme)
- [ ] Step 4: Configure Vite path aliases (`@/` → `src/`)
- [ ] Step 5: Create folder structure (features/, components/ui/, store/, hooks/, lib/, context/)
- [ ] Step 6: Set up `lib/id.js` (nanoid), `lib/date.js` (date-fns), `lib/constants.js`
- [ ] Step 7: Create base CSS tokens in `styles/index.css`

**Acceptance criteria:**
- `npm run dev` runs without errors
- Import aliases work (`@/lib/id`)
- Tailwind classes render correctly
- Dark mode class toggles work

---

## Phase 2: Zustand Store
**Estimated effort: ~1 session**

- [ ] Step 1: Create `store/boardSlice.js` with CRUD actions
- [ ] Step 2: Create `store/columnSlice.js` with CRUD + reorder actions
- [ ] Step 3: Create `store/taskSlice.js` with CRUD + moveTask action
- [ ] Step 4: Create `store/labelSlice.js` with CRUD actions
- [ ] Step 5: Combine slices in `store/index.js` with Immer + persist middleware
- [ ] Step 6: Configure persist with localStorage, debounce (300ms), and version migration
- [ ] Step 7: Add seed data function for first-visit default board

**Acceptance criteria:**
- All CRUD actions work (test via console/devtools)
- `moveTask` correctly transfers task between columns
- Cascade deletes work (delete board → columns → tasks)
- Data persists across page refresh
- Store rehydrates correctly from localStorage

---

## Phase 3: UI Shell & Layout
**Estimated effort: ~1 session**

- [ ] Step 1: Create shared UI components (Button, Input, Modal, Dropdown, ConfirmDialog, EmptyState)
- [ ] Step 2: Create `ThemeContext` + toggle logic + system preference detection
- [ ] Step 3: Create `ModalContext` (selectedTaskId, open/close)
- [ ] Step 4: Build `Layout.jsx` — sidebar + header + main area
- [ ] Step 5: Build `Sidebar` with `BoardSwitcher` + `ThemeToggle`
- [ ] Step 6: Build `Header` with board title area (placeholder for search/filters)
- [ ] Step 7: Wire up `App.jsx` with providers (Theme → Layout → Filter → Modal)

**Acceptance criteria:**
- Layout renders with sidebar, header, main content area
- Sidebar lists boards, clicking switches active board
- Theme toggle works (light ↔ dark), persists in localStorage
- Modal can open/close
- Responsive: sidebar collapsible on smaller screens

---

## Phase 4: Board & Column Rendering
**Estimated effort: ~1 session**

- [ ] Step 1: Build `BoardView.jsx` — reads active board columns, renders horizontally
- [ ] Step 2: Build `Column.jsx` — renders header + task list + quick add
- [ ] Step 3: Build `ColumnHeader.jsx` — inline editable title + color accent + actions menu
- [ ] Step 4: Build `AddColumn.jsx` — "+" button at end of columns
- [ ] Step 5: Build `BoardMenu.jsx` — rename/delete board actions
- [ ] Step 6: Implement new board creation flow (sidebar button → inline input)
- [ ] Step 7: Handle empty states (no boards, no columns)

**Acceptance criteria:**
- Columns render horizontally with overflow scroll
- Column titles are inline-editable
- New columns can be added
- New boards can be created from sidebar
- Board/column deletion works with confirmation dialog
- Empty states show helpful prompts

---

## Phase 5: Task Cards & Modal
**Estimated effort: ~1-2 sessions**

- [ ] Step 1: Build `TaskCard.jsx` — displays title, priority badge, label pills, due date
- [ ] Step 2: Build `TaskPriorityBadge.jsx` — colored indicator by priority
- [ ] Step 3: Build `LabelBadge.jsx` — colored pill with label name
- [ ] Step 4: Build `QuickAdd.jsx` — inline input at column bottom
- [ ] Step 5: Build `TaskModal.jsx` — full task detail/edit view
- [ ] Step 6: Build `TaskForm.jsx` — title, description, priority selector, date picker
- [ ] Step 7: Build `LabelPicker.jsx` — checkbox list of board labels
- [ ] Step 8: Integrate TaskCard click → open TaskModal → edit → save

**Acceptance criteria:**
- Tasks display in columns with proper visual hierarchy
- Quick add creates tasks instantly
- Clicking a card opens modal with all fields editable
- Priority changes reflect on card badge
- Labels toggle on/off in modal, show as pills on card
- Due date shows relative time ("in 3 days", "overdue")
- Delete task from modal works

---

## Phase 6: Drag & Drop
**Estimated effort: ~2 sessions**

- [ ] Step 1: Set up DndContext in BoardView with sensors (Pointer, Touch, Keyboard)
- [ ] Step 2: Make TaskCards sortable within columns (SortableContext + useSortable)
- [ ] Step 3: Implement cross-column task drag (onDragOver optimistic update)
- [ ] Step 4: Build DragOverlay with task card preview
- [ ] Step 5: Make columns sortable (SortableContext + drag handle in header)
- [ ] Step 6: Add Framer Motion layout animations for smooth reorder
- [ ] Step 7: Handle edge cases (empty column drop, rapid drags, filtered state)
- [ ] Step 8: Add auto-scroll during drag

**Acceptance criteria:**
- Tasks can be reordered within a column (smooth animation)
- Tasks can be dragged between columns (instant visual feedback)
- Columns can be reordered via drag handle
- DragOverlay shows clean preview
- Drop on empty column works
- All position changes persist to localStorage
- No flicker or jank during drag

---

## Phase 7: Search & Filters
**Estimated effort: ~1 session**

- [ ] Step 1: Create `FilterContext` with searchQuery + priority + label filters
- [ ] Step 2: Build `SearchBar.jsx` with debounced input (200ms)
- [ ] Step 3: Build `FilterChips.jsx` — toggleable priority + label chips
- [ ] Step 4: Implement filtering logic in columns (AND combination)
- [ ] Step 5: Add "Clear filters" button when filters active
- [ ] Step 6: Reset filters on board switch
- [ ] Step 7: Show "No matching tasks" empty state in filtered columns

**Acceptance criteria:**
- Typing in search filters tasks in real-time across all columns
- Priority chips toggle filter on/off
- Label chips toggle filter on/off
- Multiple filters combine with AND logic
- Clearing filters restores all tasks
- Switching boards resets filters

---

## Phase 8: Polish & Keyboard Shortcuts
**Estimated effort: ~1 session**

- [ ] Step 1: Add keyboard shortcuts (`N` new task, `Esc` close modal, `B` toggle sidebar, `?` help)
- [ ] Step 2: Build ShortcutHelpModal (shows available shortcuts)
- [ ] Step 3: Add micro-animations (card hover, modal appear, filter toggle, sidebar collapse)
- [ ] Step 4: Polish empty states with illustrations or hints
- [ ] Step 5: Add focus management (trap focus in modals, auto-focus inputs)
- [ ] Step 6: Audit accessibility (ARIA labels, keyboard nav, color contrast)
- [ ] Step 7: Performance audit (React DevTools profiler, memoization review)
- [ ] Step 8: Final localStorage edge cases (quota warning, corrupt data recovery, beforeunload flush)

**Acceptance criteria:**
- All keyboard shortcuts work
- Smooth animations throughout
- Full keyboard navigation
- Lighthouse performance ≥ 90
- No console errors or warnings
- localStorage handles all edge cases gracefully

---

## Implementation Order (Dependency Graph)

```
Phase 1 (Setup)
    └── Phase 2 (Store)
        ├── Phase 3 (UI Shell)
        │   └── Phase 4 (Board & Columns)
        │       └── Phase 5 (Tasks & Modal)
        │           └── Phase 6 (Drag & Drop)
        │               └── Phase 7 (Filters)
        │                   └── Phase 8 (Polish)
```

Each phase must be fully complete before starting the next.
