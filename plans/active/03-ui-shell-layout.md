# Plan: Phase 3 — UI Shell & Layout
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Build the application shell (sidebar + header + main area), shared UI primitives, and context providers (Theme, Modal). After this phase, the app has a navigable layout with board switching and theme toggle.

## Implementation Steps

### Step 1: Shared UI Components (`components/ui/`)

| Component | Props | Purpose |
|-----------|-------|---------|
| `Button` | variant, size, icon, onClick, disabled | Primary action button |
| `Input` | value, onChange, placeholder, autoFocus | Text input with Tailwind styling |
| `Modal` | isOpen, onClose, title, children | Overlay modal with backdrop + focus trap |
| `Dropdown` | trigger, items, onSelect | Popover action menu |
| `ConfirmDialog` | isOpen, title, message, onConfirm, onCancel | Destructive action confirmation |
| `EmptyState` | icon, title, description, action | Placeholder for empty lists |
| `Tooltip` | content, children | Hover tooltip |

### Step 2: Theme System (`context/ThemeContext.jsx`)

- Check localStorage for saved theme
- Fallback to `window.matchMedia('(prefers-color-scheme: dark)')`
- Apply/remove `dark` class on `document.documentElement`
- Provide `{ theme, toggleTheme }` via context

### Step 3: Modal Context (`context/ModalContext.jsx`)

- State: `{ isOpen, selectedTaskId }`
- Actions: `openTaskModal(taskId)`, `closeModal()`
- Used by TaskCard (open) and TaskModal (close)

### Step 4: Layout (`app/Layout.jsx`)

```
┌─────────────────────────────────────┐
│ ┌──────────┬──────────────────────┐ │
│ │          │      Header          │ │
│ │ Sidebar  ├──────────────────────┤ │
│ │          │                      │ │
│ │          │      Main Content    │ │
│ │          │      (BoardView)     │ │
│ │          │                      │ │
│ └──────────┴──────────────────────┘ │
└─────────────────────────────────────┘
```

- Sidebar: 260px fixed width, collapsible
- Header: 56px height, sticky
- Main: flex-1, overflow-x-auto (for column scroll)

### Step 5: Sidebar

- Logo/app name at top
- Board list with active indicator
- "New Board" button
- Theme toggle at bottom
- Collapse button (hamburger)

### Step 6: Header

- Active board title (editable on click)
- Search bar placeholder (wired in Phase 7)
- Filter chips placeholder (wired in Phase 7)

### Step 7: Wire Up App.jsx

```jsx
<ThemeProvider>
  <Layout>
    <FilterProvider>
      <ModalProvider>
        {/* main content area — BoardView comes in Phase 4 */}
      </ModalProvider>
    </FilterProvider>
  </Layout>
</ThemeProvider>
```

## Acceptance Criteria

- [ ] Layout renders with 3 regions (sidebar, header, main)
- [ ] Board list in sidebar, clicking switches active board
- [ ] Theme toggle works and persists
- [ ] Modal opens/closes with backdrop
- [ ] ConfirmDialog works for destructive actions
- [ ] Sidebar can collapse/expand
- [ ] All UI components support dark mode
