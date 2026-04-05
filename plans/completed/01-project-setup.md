# Plan: Phase 1 — Project Setup & Foundation
# Status: Not Started
# Last Updated: 2026-04-05

## Overview

Initialize the Vite + React project, install all dependencies, configure Tailwind + path aliases, and create the folder skeleton. No components or business logic — just the scaffolding.

## Implementation Steps

### Step 1: Initialize Vite Project

```bash
npm create vite@latest ./ -- --template react
```

- Use React template (not TypeScript for now — `.jsx`)
- Clean out default boilerplate (App.css, react.svg, etc.)

### Step 2: Install Dependencies

```bash
npm install zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities framer-motion date-fns nanoid immer
npm install -D tailwindcss @tailwindcss/vite
```

### Step 3: Configure Tailwind

**tailwind.config.js:**
```js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom semantic colors defined here
      },
    },
  },
  plugins: [],
};
```

**src/styles/index.css:**
```css
@import "tailwindcss";

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100;
    @apply font-sans antialiased;
  }
}
```

### Step 4: Configure Vite Path Aliases

**vite.config.js:**
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Step 5: Create Folder Structure

```
src/
├── app/
├── features/
│   ├── board/components/
│   ├── board/hooks/
│   ├── column/components/
│   ├── column/hooks/
│   ├── task/components/
│   ├── task/hooks/
│   ├── label/components/
│   ├── label/hooks/
│   ├── filter/components/
│   ├── filter/hooks/
│   ├── filter/context/
│   └── dnd/components/
│   └── dnd/hooks/
├── components/ui/
├── components/icons/
├── store/
├── hooks/
├── lib/
├── context/
└── styles/
```

Create `.gitkeep` in empty directories.

### Step 6: Create Base Utilities

**src/lib/id.js** — nanoid wrapper
**src/lib/date.js** — date-fns formatting helpers
**src/lib/constants.js** — priorities, default colors, default labels

### Step 7: Create Base CSS Tokens

Custom properties for consistent spacing, colors, transitions.
Google Fonts import for Inter.

## Acceptance Criteria

- [ ] `npm run dev` starts without errors
- [ ] `@/lib/id` import resolves correctly
- [ ] Tailwind classes render in browser
- [ ] Dark mode toggle on `<html>` works (manual test)
- [ ] All folders exist in correct structure

## Notes

- Do NOT add any components or business logic in this phase
- This is pure scaffolding
