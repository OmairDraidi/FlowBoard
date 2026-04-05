# Plan: Phase 5 — Task Cards & Modal
# Status: Completed ✅
# Last Updated: 2026-04-05

## Overview

Build the TaskCard visual component, quick-add input, and the TaskModal for detailed editing. This phase makes tasks fully interactive.

## Implementation Steps

- [x] Step 1: `TaskCard.jsx` — render title, priority badge, label pills (max 3 + overflow), relative due date; use `React.memo`
- [x] Step 2: `TaskPriorityBadge.jsx` — colored dot/icon per priority level (none, low, medium, high, urgent)
- [x] Step 3: `LabelBadge.jsx` — small colored pill with label name
- [x] Step 4: `QuickAdd.jsx` — inline input at column bottom; Enter creates task; Esc cancels; auto-focus after creation
- [x] Step 5: `TaskModal.jsx` — centered modal via ModalContext; renders TaskForm; close on Esc or backdrop click
- [x] Step 6: `TaskForm.jsx` — inline-editable title, description textarea (markdown support later), priority dropdown, due date input, label picker
- [x] Step 7: `LabelPicker.jsx` — checkbox list of board labels with color swatches
- [x] Step 8: Integration — TaskCard click → openTaskModal → edit fields → save via store.updateTask

## Acceptance Criteria

- [x] Task cards show in columns with proper visual hierarchy
- [x] Quick add creates tasks and clears input
- [x] Clicking card opens modal with full editing
- [x] Priority badge colors match priority level
- [x] Labels show as pills on card + toggleable in modal
- [x] Due date displays relative time (date-fns `formatDistanceToNow`)
- [x] Delete task from modal with confirmation
- [x] Modal has focus trap and closes on Esc
- [x] No infinite loops or re-render issues (useShallow fixed)
