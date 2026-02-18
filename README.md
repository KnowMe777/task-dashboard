# TaskFlow — Task Dashboard

A lightweight, browser-based task management dashboard built with vanilla HTML, CSS, and JavaScript.

## What it does

TaskFlow lets you create, track, and manage tasks directly in your browser — no backend or build step required.

**Key features:**

- 📋 **Dashboard** — overview of all tasks with stats: total, completed, pending, and progress percentage
- ➕ **Add tasks** — create new tasks with a title, description, and status via a modal form
- ✏️ **Edit & delete** — update or remove any task
- ✅ **Toggle completion** — mark tasks as completed or pending with a single click
- 🗂️ **Filtered views** — dedicated pages for All Tasks, Completed, and Pending
- 💾 **Persistent storage** — tasks are saved to `localStorage` so they survive page refreshes

## Tech stack

- **HTML / Tailwind CSS** (via CDN) — layout and styling
- **Font Awesome** (via CDN) — icons
- **Vanilla JavaScript (ES Modules)** — logic split across:
  - `src/task.js` — `Task` class (model)
  - `src/taskManager.js` — CRUD operations & localStorage persistence
  - `src/uiController.js` — DOM rendering and event handling
  - `src/app.js` — entry point, wires everything together

## Project structure

```
task-dashboard/
├── index.html          # Dashboard (home)
├── pages/
│   ├── allTasks.html   # All tasks view
│   ├── completed.html  # Completed tasks view
│   └── pending.html    # Pending tasks view
└── src/
    ├── app.js
    ├── task.js
    ├── taskManager.js
    └── uiController.js
```

#
