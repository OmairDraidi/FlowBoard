# FlowBoard — Master Implementation Plan
# Status: Complete ✅
# Last Updated: 2026-04-05

## Overview

Phased implementation plan for FlowBoard. Each phase builds on the previous one. Features are ordered by dependency — foundation first, polish last.

---

## Phase 1: Project Setup & Foundation
**Estimated effort: ~1 session**

- [x] Step 1: Initialize Vite + React 18 project
- [x] Step 2: Install dependencies (tailwind, zustand, @dnd-kit, framer-motion, date-fns, nanoid)
- [x] Step 3: Configure Tailwind (dark mode: 'class', custom theme)
- [x] Step 4: Configure Vite path aliases (`@/` → `src/`)
- [x] Step 5: Create folder structure (features/, components/ui/, store/, hooks/, lib/, context/)
- [x] Step 6: Set up `lib/id.js` (nanoid), `lib/date.js` (date-fns), `lib/constants.js`
- [x] Step 7: Create base CSS tokens in `styles/index.css`

**Acceptance criteria:**
- `npm run dev` runs without errors
- Import aliases work (`@/lib/id`)
- Tailwind classes render correctly
- Dark mode class toggles work

---

## Phase 2: Zustand Store
**Estimated effort: ~1 session**

- [x] Step 1: Create `store/boardSlice.js` with CRUD actions
- [x] Step 2: Create `store/columnSlice.js` with CRUD + reorder actions
- [x] Step 3: Create `store/taskSlice.js` with CRUD + moveTask action
- [x] Step 4: Create `store/labelSlice.js` with CRUD actions
- [x] Step 5: Combine slices in `store/index.js` with Immer + persist middleware
- [x] Step 6: Configure persist with localStorage, debounce (300ms), and version migration
- [x] Step 7: Add seed data function for first-visit default board

**Acceptance criteria:**
- All CRUD actions work (test via console/devtools)
- `moveTask` correctly transfers task between columns
- Cascade deletes work (delete board → columns → tasks)
- Data persists across page refresh
- Store rehydrates correctly from localStorage

---

## Phase 3: UI Shell & Layout ✅
**Estimated effort: ~1 session**

- [x] Step 1: Create shared UI components (Button, Input, Modal, Dropdown, ConfirmDialog, EmptyState, Tooltip)
- [x] Step 2: Create `ThemeContext` + toggle logic + system preference detection
- [x] Step 3: Create `ModalContext` (selectedTaskId, open/close)
- [x] Step 4: Build `Layout.jsx` — sidebar + header + main area
- [x] Step 5: Build `Sidebar` with `BoardSwitcher` + `ThemeToggle`
- [x] Step 6: Build `Header` with board title area (placeholder for search/filters)
- [x] Step 7: Wire up `App.jsx` with providers (Theme → Layout → Filter → Modal)

**Acceptance criteria:**
- Layout renders with sidebar, header, main content area
- Sidebar lists boards, clicking switches active board
- Theme toggle works (light ↔ dark), persists in localStorage
- Modal can open/close
- Responsive: sidebar collapsible on smaller screens

---

## Phase 4: Board & Column Rendering ✅
**Estimated effort: ~1 session**

- [x] Step 1: Build `BoardView.jsx` — reads active board columns, renders horizontally
- [x] Step 2: Build `Column.jsx` — renders header + task list + quick add
- [x] Step 3: Build `ColumnHeader.jsx` — inline editable title + color accent + actions menu
- [x] Step 4: Build `AddColumn.jsx` — "+" button at end of columns
- [x] Step 5: Build `BoardMenu.jsx` — rename/delete board actions
- [x] Step 6: Implement new board creation flow (sidebar button → inline input)
- [x] Step 7: Handle empty states (no boards, no columns)

**Acceptance criteria:**
- Columns render horizontally with overflow scroll
- Column titles are inline-editable
- New columns can be added
- New boards can be created from sidebar
- Board/column deletion works with confirmation dialog
- Empty states show helpful prompts

---

## Phase 5: Task Cards & Modal ✅
**Estimated effort: ~1-2 sessions**

- [x] Step 1: Build `TaskCard.jsx` — displays title, priority badge, label pills, due date
- [x] Step 2: Build `TaskPriorityBadge.jsx` — colored indicator by priority
- [x] Step 3: Build `LabelBadge.jsx` — colored pill with label name
- [x] Step 4: Build `QuickAdd.jsx` — inline input at column bottom
- [x] Step 5: Build `TaskModal.jsx` — full task detail/edit view
- [x] Step 6: Build `TaskForm.jsx` — title, description, priority selector, date picker
- [x] Step 7: Build `LabelPicker.jsx` — checkbox list of board labels
- [x] Step 8: Integrate TaskCard click → open TaskModal → edit → save

**Acceptance criteria:**
- [x] Tasks display in columns with proper visual hierarchy
- [x] Quick add creates tasks instantly
- [x] Clicking a card opens modal with all fields editable
- [x] Priority changes reflect on card badge
- [x] Labels toggle on/off in modal, show as pills on card
- [x] Due date shows relative time ("in 3 days", "overdue")
- [x] Delete task from modal works
- [x] No infinite loops or re-render issues (useShallow fixed)

---

## Phase 6: Drag & Drop ✅
**Estimated effort: ~2 sessions**

- [x] Step 1: Set up DndContext in BoardView with sensors (Pointer, Touch, Keyboard)
- [x] Step 2: Make TaskCards sortable within columns (SortableContext + useSortable)
- [x] Step 3: Implement cross-column task drag (onDragOver optimistic update)
- [x] Step 4: Build DragOverlay with task card preview
- [x] Step 5: Make columns sortable (SortableContext + drag handle in header)
- [x] Step 6: Add Framer Motion layout animations for smooth reorder
- [x] Step 7: Handle edge cases (empty column drop, rapid drags, filtered state)
- [x] Step 8: Add auto-scroll during drag

**Acceptance criteria:**
- Tasks can be reordered within a column (smooth animation)
- Tasks can be dragged between columns (instant visual feedback)
- Columns can be reordered via drag handle
- DragOverlay shows clean preview
- Drop on empty column works
- All position changes persist to localStorage
- No flicker or jank during drag

---

## Phase 7: Search & Filters ✅
**Estimated effort: ~1 session**

- [x] Step 1: Create `FilterContext` with searchQuery + priority + label filters
- [x] Step 2: Build `SearchBar.jsx` with debounced input (200ms)
- [x] Step 3: Build `FilterChips.jsx` — toggleable priority + label chips
- [x] Step 4: Implement filtering logic in columns (AND combination)
- [x] Step 5: Add "Clear filters" button when filters active
- [x] Step 6: Reset filters on board switch
- [x] Step 7: Show "No matching tasks" empty state in filtered columns

**Acceptance criteria:**
- Typing in search filters tasks in real-time across all columns
- Priority chips toggle filter on/off
- Label chips toggle filter on/off
- Multiple filters combine with AND logic
- Clearing filters restores all tasks
- Switching boards resets filters

---

## Phase 8: Polish & Keyboard Shortcuts ✅
**Estimated effort: ~1 session**

- [x] Step 1: Add keyboard shortcuts (`N` new task, `Esc` close modal, `B` toggle sidebar, `?` help)
- [x] Step 2: Build ShortcutHelpModal (shows available shortcuts)
- [x] Step 3: Add micro-animations (card hover, modal appear, filter toggle, sidebar collapse)
- [x] Step 4: Polish empty states with illustrations or hints
- [x] Step 5: Add focus management (trap focus in modals, auto-focus inputs)
- [x] Step 6: Audit accessibility (ARIA labels, keyboard nav, color contrast)
- [x] Step 7: Performance audit (React DevTools profiler, memoization review)
- [x] Step 8: Final localStorage edge cases (quota warning, corrupt data recovery, beforeunload flush)

**Acceptance criteria:**
- [x] All keyboard shortcuts work
- [x] Smooth animations throughout
- [x] Full keyboard navigation
- [x] Lighthouse performance ≥ 90
- [x] No console errors or warnings
- [x] localStorage handles all edge cases gracefully

---

## Phase 0: Infrastructure & DevOps
**Estimated effort: ~0.5 session**

- [x] Step 1: Initialize Git repository
- [x] Step 2: Configure `.gitignore` (excluded `.ai`, `node_modules`, etc.)
- [x] Step 3: Set up GitHub remote and initial push
- [x] Step 4: Create multi-stage `Dockerfile` (Node build → Nginx serve)
- [x] Step 5: Configure `nginx.conf` for SPA routing
- [x] Step 6: Create `docker-compose.yml` for local production testing

**Acceptance criteria:**
- Code is pushed to GitHub
- Docker image builds successfully
- Nginx serves the app and handles routing correctly

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
