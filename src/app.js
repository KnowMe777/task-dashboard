import { TaskManager } from "./taskManager.js";
import { UIController } from "./uiController.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const tm = new TaskManager("tasks");
    const ui = new UIController(tm);

    // Detect filter from the current page filename
    // Works regardless of full path / server prefix
    const filename = location.pathname.split("/").pop(); // e.g. "completed.html"

    const pageToFilter = {
      "allTasks.html": "all",
      "completed.html": "completed",
      "pending.html": "pending",
    };

    const filter = pageToFilter[filename] ?? "all";
    ui.displayTasks(filter);
  } catch (err) {
    console.error("TaskFlow init error:", err);
  }
});
