import { TaskManager } from "./taskManager.js";
import { UIController } from "./uiController.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const rawPath = location.pathname.split("/").pop();
    const filename = rawPath.includes(".") ? rawPath : rawPath + ".html";

    const pageToFilter = {
      "allTasks.html": "all",
      "completed.html": "completed",
      "pending.html": "pending",
    };

    const filter = pageToFilter[filename] ?? "all";
  } catch (err) {
    console.error("TaskFlow init error:", err);
  }
});
