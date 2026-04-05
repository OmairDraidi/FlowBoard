# Plan: Phase 6 — Drag & Drop
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Implement drag-and-drop using @dnd-kit for task reordering (intra-column), task moving (cross-column), and column reordering. This is the most complex phase.

## Implementation Steps

- [ ] Step 1: Wrap BoardView in `DndContext` with Pointer, Touch, and Keyboard sensors
- [ ] Step 2: Wrap column list in `SortableContext` (horizontal strategy) for column reorder
- [ ] Step 3: Make each Column sortable via `useSortable` with drag handle
- [ ] Step 4: Wrap task list in each Column with `SortableContext` (vertical strategy)
- [ ] Step 5: Make each TaskCard sortable via `useSortable`
- [ ] Step 6: Build `useDragHandlers.js` hook with onDragStart, onDragOver, onDragEnd logic
- [ ] Step 7: Build `DragOverlay.jsx` — renders preview of dragged task or column
- [ ] Step 8: Handle cross-column move in onDragOver (optimistic reorder)
- [ ] Step 9: Finalize positions in onDragEnd with store mutations
- [ ] Step 10: Add Framer Motion `layoutId` for smooth post-drop animations
- [ ] Step 11: Handle edge cases (empty column drop, disable column drag during task drag)
- [ ] Step 12: Configure auto-scroll modifier for long columns

## Key Architecture Decisions

- **Single DndContext** wrapping entire board (not nested)
- **Collision detection**: `closestCenter` for tasks, `closestCorners` for columns
- **Active type tracking**: distinguish task vs column drag via data attribute
- **Optimistic updates**: move task during onDragOver for instant feedback

## Acceptance Criteria

- [ ] Intra-column task reorder works smoothly
- [ ] Cross-column task move works with visual feedback
- [ ] Column reorder via drag handle works
- [ ] DragOverlay shows clean preview (not the original element)
- [ ] Dropping on empty column works
- [ ] Animations are smooth (no flicker)
- [ ] Touch drag works on tablet
- [ ] State persists after drag operations
