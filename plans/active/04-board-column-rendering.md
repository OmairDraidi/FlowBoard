# Plan: Phase 4 — Board & Column Rendering
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Render the active board's columns in a horizontal layout. Implement column CRUD (add, rename, delete) and board management (create, rename, delete).

## Implementation Steps

- [ ] Step 1: `BoardView.jsx` — read activeBoardId, map columnOrder to Column components, horizontal flex layout with overflow-x scroll
- [ ] Step 2: `Column.jsx` — container with header, task list area, quick-add slot; min-width 280px, max-height with vertical scroll
- [ ] Step 3: `ColumnHeader.jsx` — editable title (click to edit), color accent bar, "..." dropdown for rename/delete
- [ ] Step 4: `AddColumn.jsx` — "+" button at end of column row; click reveals inline input
- [ ] Step 5: `BoardMenu.jsx` — dropdown on board item in sidebar for rename/delete
- [ ] Step 6: New board creation — "+" in sidebar, inline input, creates board with 3 default columns
- [ ] Step 7: Empty states — "No boards yet", "No columns yet" with CTA buttons

## Acceptance Criteria

- [ ] Active board columns render horizontally
- [ ] Column titles are inline-editable (click → input → blur/Enter saves)
- [ ] Add column works and appears at end
- [ ] Delete column shows confirmation + removes column + tasks
- [ ] Board can be created/renamed/deleted from sidebar
- [ ] Horizontal scroll works for many columns
- [ ] Empty states guide the user
