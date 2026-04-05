# 🚀 FlowBoard

FlowBoard is a modern, premium Kanban-style task management application designed for seamless productivity and beautiful user experiences. Built to be fast, responsive, and visually stunning using React and Tailwind CSS v4.

## ✨ Features

- **Intuitive Kanban Board:** Manage your workflow with customizable and completely sortable columns.
- **Drag & Drop Mastering:** Powered by `@dnd-kit` for seamless, silky-smooth reorganization of tasks and entire columns across the board.
- **Advanced Global Search & Filters:** Instantly find what you need by searching titles/descriptions or filtering by prioritizing flags and custom labels.
- **Dynamic Theme System:** Flawless transition between Dark and Light modes using modern efficient CSS variables architecture.
- **Smart State Management:** Persistent data storage using Zustand + Immer + LocalStorage, ensuring you never lose your progress even after a refresh.
- **Responsive Layout:** Exquisite desktop sidebar and a mobile navigation drawer for managing multiple boards gracefully on any device.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (with Persist Middleware)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/) Core & Sortable
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 🏃‍♂️ Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/FlowBoard.git
   ```

2. Navigate into the project directory:
   ```bash
   cd FlowBoard
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### 🐳 Docker Deployment (Production Ready)

If you prefer using Docker, this project comes with a high-performance production setup powered by a customized **Nginx** web server.

1. Build and run the app in the background:
   ```bash
   docker-compose up -d --build
   ```

2. Open your browser and navigate to:
   **[http://localhost:8080](http://localhost:8080)**

3. To safely stop the application:
   ```bash
   docker-compose down
   ```

## 💡 About The Setup

This project uses an optimized feature-based architecture pattern, keeping components, context, and state logic scoped elegantly allowing for massive scalability.

## 🗺️ Roadmap (Future Development)

We are actively developing **FlowBoard** to become a fully-fledged enterprise tool. Here is what's coming next:

- [ ] **Backend & Cloud Sync:** Transitioning from `LocalStorage` to a robust cloud database (PostgreSQL / Supabase).
- [ ] **Real-Time Collaboration:** Integrating WebSockets (Socket.io) for live multiplayer board editing.
- [ ] **Rich Text Formatting:** Adding a full Markdown editor for task descriptions and comments.
- [ ] **Advanced Sub-Tasks:** Support for nested sub-tasks and interactive checklists.
- [ ] **Calendar & Analytics:** A dedicated timeline view and productivity dashboard.
- [ ] **Authentication System:** Secure multi-user login (JWT/OAuth) and workspace sharing.

## 🤝 Contribution
Contributions, issues, and feature requests are always welcome! Feel free to review the codebase and submit a Pull Request.

## 📝 License
This project is open-source and available under the MIT License.
