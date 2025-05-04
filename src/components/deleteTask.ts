// deleteTask.ts
import { tasksArray, saveTasksToLocalStorage } from "../main";
import { displayTasks } from "./displayTasks";
import { closeDeleteModal } from "./modal";

const deleteTaskBtn = document.getElementById(
  "delete-task-btn"
) as HTMLButtonElement | null;

export function deleteTask(id: string) {
  deleteTaskBtn?.addEventListener("click", () => {
    const updatedTasksArray = tasksArray.filter((task) => task.id !== id);
    saveTasksToLocalStorage("tasksArray", updatedTasksArray);
    displayTasks(updatedTasksArray);
    closeDeleteModal();
  });
}
