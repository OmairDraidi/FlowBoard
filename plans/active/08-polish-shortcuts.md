# Plan: Phase 8 — Polish & Keyboard Shortcuts
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Final polish pass — keyboard shortcuts, micro-animations, accessibility audit, performance optimization, and localStorage edge case handling.

## Implementation Steps

- [ ] Step 1: `useKeyboardShortcuts.js` — global key listener with shortcut map
- [ ] Step 2: Shortcut map: `N` (new task), `Esc` (close modal), `B` (toggle sidebar), `?` (help modal)
- [ ] Step 3: `ShortcutHelpModal` — shows all available shortcuts
- [ ] Step 4: Micro-animations — card hover scale, modal enter/exit, filter chip toggle, sidebar slide
- [ ] Step 5: Focus management — trap in modals, auto-focus inputs, restore focus on close
- [ ] Step 6: Accessibility audit — ARIA labels, roles, keyboard nav through columns/cards
- [ ] Step 7: Performance audit — React DevTools profiler, verify memoization, check re-render counts
- [ ] Step 8: localStorage hardening — QuotaExceededError handling, corrupt data recovery, beforeunload flush

## Acceptance Criteria

- [ ] All keyboard shortcuts work globally
- [ ] `?` opens shortcut help overlay
- [ ] Smooth animations throughout (no jank)
- [ ] Full keyboard navigation possible
- [ ] ARIA attributes on all interactive elements
- [ ] Lighthouse performance ≥ 90
- [ ] localStorage edge cases handled gracefully
- [ ] No console errors or warnings
