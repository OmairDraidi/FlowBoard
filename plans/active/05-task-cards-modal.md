# Plan: Phase 5 — Task Cards & Modal
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Build the TaskCard visual component, quick-add input, and the TaskModal for detailed editing. This phase makes tasks fully interactive.

## Implementation Steps

- [ ] Step 1: `TaskCard.jsx` — render title, priority badge, label pills (max 3 + overflow), relative due date; use `React.memo`
- [ ] Step 2: `TaskPriorityBadge.jsx` — colored dot/icon per priority level (none, low, medium, high, urgent)
- [ ] Step 3: `LabelBadge.jsx` — small colored pill with label name
- [ ] Step 4: `QuickAdd.jsx` — inline input at column bottom; Enter creates task; Esc cancels; auto-focus after creation
- [ ] Step 5: `TaskModal.jsx` — centered modal via ModalContext; renders TaskForm; close on Esc or backdrop click
- [ ] Step 6: `TaskForm.jsx` — inline-editable title, description textarea (markdown support later), priority dropdown, due date input, label picker
- [ ] Step 7: `LabelPicker.jsx` — checkbox list of board labels with color swatches
- [ ] Step 8: Integration — TaskCard click → openTaskModal → edit fields → save via store.updateTask

## Acceptance Criteria

- [ ] Task cards show in columns with proper visual hierarchy
- [ ] Quick add creates tasks and clears input
- [ ] Clicking card opens modal with full editing
- [ ] Priority badge colors match priority level
- [ ] Labels show as pills on card + toggleable in modal
- [ ] Due date displays relative time (date-fns `formatDistanceToNow`)
- [ ] Delete task from modal with confirmation
- [ ] Modal has focus trap and closes on Esc
