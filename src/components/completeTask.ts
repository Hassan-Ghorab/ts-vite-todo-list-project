import { saveTasksToLocalStorage, tasksArray } from "../main";
import { displayTasks } from "./displayTasks";

export function completeTask(id: string) {
  tasksArray.map((task) => {
    if (task.id === id) {
      task.isCompleted = !task.isCompleted;
      displayTasks(tasksArray);
      saveTasksToLocalStorage("tasksArray", tasksArray);
    }
  });

  console.log(id);
}
