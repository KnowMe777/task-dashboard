import { Task } from "./task.js";

const STORAGE_KEY = "taskflow_tasks";

export class TaskManager {
  #tasks = [];

  constructor() {
    this.#loadFromStorage();
  }

  //private helpers

  #save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.#tasks.map((t) => t.toJSON())),
      );
    } catch (err) {
      console.error("Failed to save tasks:", err);
    }
  }

  #loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Use spread + map to restore Task instances
        this.#tasks = [...parsed.map((data) => Task.fromJSON(data))];
      }
    } catch (err) {
      console.error("Failed to load tasks:", err);
      this.#tasks = [];
    } finally {
      console.log(
        `TaskManager initialized with ${this.#tasks.length} task(s).`,
      );
    }
  }

  // CRUP operations

  addTask({ title, description, completed = false }) {
    if (!title || !title.trim()) throw new Error("Task title is required.");
    const task = new Task({ title, description, completed });
    this.#tasks = [...this.#tasks, task];
    this.#save();
    return task;
  }

  getTaskById(id) {
    return this.#tasks.find((t) => t.id === id) ?? null;
  }

  updateTask(id, updates) {
    const task = this.getTaskById(id);
    if (!task) throw new Error(`Task with id "${id}" not found.`);
    task.update(updates);
    this.#save();
    return task;
  }

  deleteTask(id) {
    const before = this.#tasks.length;
    this.#tasks = this.#tasks.filter((t) => t.id !== id);
    if (this.#tasks.length === before)
      throw new Error(`Task with id "${id}" not found.`);
    this.#save();
  }

  toggleTask(id) {
    const task = this.getTaskById(id);
    if (!task) throw new Error(`Task with id "${id}" not found.`);
    task.toggleComplete();
    this.#save();
    return task;
  }

  // getter functions

  getAllTasks() {
    return [...this.#tasks];
  }

  getCompleted() {
    return this.#tasks.filter((t) => t.completed);
  }

  getPending() {
    return this.#tasks.filter((t) => !t.completed);
  }

  getStats() {
    const total = this.#tasks.length;
    const completed = this.#tasks.reduce(
      (acc, t) => acc + (t.completed ? 1 : 0),
      0,
    );
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, progress };
  }

  // filter by status
  filterTasks(filter = "all") {
    const filters = {
      all: () => this.getAllTasks(),
      completed: () => this.getCompleted(),
      pending: () => this.getPending(),
    };
    return (filters[filter] ?? filters.all)();
  }

  getSortedByDate(tasks = this.getAllTasks()) {
    return [...tasks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }
}
