export class Task {
  constructor({
    id = null,
    title,
    description = "",
    completed = false,
    createdAt = null,
    updatedAt = null,
    completedAt = null,
  } = {}) {
    this.id = id ?? crypto.randomUUID();
    this.title = title.trim();
    this.description = description.trim();
    this.completed = completed;
    this.createdAt = createdAt ?? new Date().toISOString();
    this.updatedAt = updatedAt ?? new Date().toISOString();
    this.completedAt = completedAt ?? null;
  }

  // Toggle completion status and track time
  toggleComplete() {
    this.completed = !this.completed;
    this.completedAt = this.completed ? new Date().toISOString() : null;
    this.updatedAt = new Date().toISOString();
    return this;
  }

  // Update task fields using destructuring + spread
  update({ title, description }) {
    if (title !== undefined) this.title = title.trim();
    if (description !== undefined) this.description = description.trim();
    this.updatedAt = new Date().toISOString();
    return this;
  }

  // Serialize to plain object for localStorage
  toJSON() {
    const {
      id,
      title,
      description,
      completed,
      createdAt,
      updatedAt,
      completedAt,
    } = this;
    return {
      id,
      title,
      description,
      completed,
      createdAt,
      updatedAt,
      completedAt,
    };
  }

  // Deserialize from plain object
  static fromJSON(data) {
    return new Task({ ...data });
  }

  // Format date for display
  get formattedDate() {
    return new Date(this.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  get status() {
    return this.completed ? "Completed" : "Pending";
  }
}
