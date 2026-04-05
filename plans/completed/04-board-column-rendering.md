# Plan: Phase 4 — Board & Column Rendering
# Status: Completed ✅
# Last Updated: 2026-04-05

## Overview

Render the active board's columns in a horizontal layout. Implement column CRUD (add, rename, delete) and board management (create, rename, delete).

## Implementation Steps

- [x] Step 1: `BoardView.jsx` — read activeBoardId, map columnOrder to Column components, horizontal flex layout with overflow-x scroll
- [x] Step 2: `Column.jsx` — container with header, task list area, quick-add slot; min-width 280px, max-height with vertical scroll
- [x] Step 3: `ColumnHeader.jsx` — editable title (click to edit), color accent bar, "..." dropdown for rename/delete
- [x] Step 4: `AddColumn.jsx` — "+" button at end of column row; click reveals inline input
- [x] Step 5: `BoardMenu.jsx` — dropdown on board item in sidebar for rename/delete
- [x] Step 6: New board creation — "+" in sidebar, inline input, creates board with 3 default columns
- [x] Step 7: Empty states — "No boards yet", "No columns yet" with CTA buttons

## Acceptance Criteria

- [x] Active board columns render horizontally
- [x] Column titles are inline-editable (click → input → blur/Enter saves)
- [x] Add column works and appears at end
- [x] Delete column shows confirmation + removes column + tasks
- [x] Board can be created/renamed/deleted from sidebar
- [x] Horizontal scroll works for many columns
- [x] Empty states guide the user
