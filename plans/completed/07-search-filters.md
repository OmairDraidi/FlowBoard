# Plan: Phase 7 — Search & Filters
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Add search and filter capabilities. Filters are transient UI state that control task visibility without modifying data.

## Implementation Steps

- [ ] Step 1: Create `FilterContext` — searchQuery, priorities[], labelIds[], actions
- [ ] Step 2: Build `SearchBar.jsx` — controlled input with 200ms debounce
- [ ] Step 3: Build `FilterChips.jsx` — toggleable chips for each priority level + each board label
- [ ] Step 4: Implement filter logic in Column — compute `filteredTasks` from `columnTasks`
- [ ] Step 5: Add "Clear all filters" button when any filter is active
- [ ] Step 6: Reset filters on board switch (`activeBoardId` change)
- [ ] Step 7: Show "No matching tasks" in empty filtered columns

## Acceptance Criteria

- [ ] Search filters tasks by title and description (case-insensitive)
- [ ] Priority chips toggle filters
- [ ] Label chips toggle filters
- [ ] AND logic: multiple filters narrow results
- [ ] Clear filters restores all tasks
- [ ] Board switch resets filters
- [ ] Debounced search (no lag while typing)
