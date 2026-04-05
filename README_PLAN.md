# FlowBoard 🚀

A production-grade, local-first Kanban project management tool built with React 18.

## Features

- 📋 Multiple project boards with custom workflow columns
- ✏️ Rich task management (priority, labels, due dates)
- 🖱️ Butter-smooth drag-and-drop (powered by @dnd-kit)
- 🔍 Real-time search and filtering
- 🌙 Light / Dark mode with system preference detection
- 💾 Automatic localStorage persistence — zero backend
- ⌨️ Keyboard shortcuts for power users
- ♿ Accessible (WCAG 2.1 AA)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite |
| UI | React 18 |
| Styling | Tailwind CSS |
| State | Zustand |
| Drag & Drop | @dnd-kit |
| Animation | Framer Motion |
| Dates | date-fns |

## Getting Started

```bash
npm install
npm run dev
```

## Architecture

- **Feature-based folder structure** — co-located components, hooks, and context per domain
- **Normalized Zustand store** — flat entity maps with ID references
- **Computed state via selectors** — no duplicate data
- **Debounced localStorage persistence** — automatic save

See `.ai/context/architecture.md` for detailed architecture documentation.

## Project Structure

```
src/
├── app/           # App shell and layout
├── features/      # Feature modules (board, column, task, label, filter, dnd)
├── components/ui/ # Shared UI primitives
├── store/         # Zustand state slices
├── hooks/         # Shared hooks
├── lib/           # Pure utilities
├── context/       # App-wide contexts
└── styles/        # Tailwind config + tokens
```

## License

MIT
