import "./sass/main.scss";
import "./components/modal";
import "./components/addTask";
import "./components/displayTasks";
import "./components/completeTask";
import "./components/deleteTask";
import { displayTasks } from "./components/displayTasks";
import { INewTaskObject } from "./interfaces";

export let tasksArray: INewTaskObject[] = JSON.parse(
  localStorage.getItem("tasksArray") || "[]"
);

export function saveTasksToLocalStorage(
  key: string,
  value: INewTaskObject[]
): void {
  localStorage.setItem(key, JSON.stringify(value));
}



displayTasks(tasksArray);
