import { openModal, closeModal } from "./modal";
import { v4 as uuid } from "uuid";
import { tasksArray, saveTasksToLocalStorage } from "../main";
import { INewTaskObject } from "../interfaces";
import { displayTasks } from "./displayTasks";

// DOM elements
const openAddTaskModalBtn = document.getElementById("open-add-task-modal-btn") as HTMLButtonElement | null;
const addNewTaskForm = document.getElementById("new-task-form") as HTMLFormElement | null;
const newTaskTitleInput = document.getElementById("new-task-title-input") as HTMLInputElement | null;
const newTaskDetailsInput = document.getElementById("new-task-details-input") as HTMLInputElement | null;

// Flag to determine if we're editing or adding a task
let isEditing = false;
let currentEditingTaskId: string | null = null;  // Store ID of the task being edited

// Open add task modal
openAddTaskModalBtn?.addEventListener("click", () => {
  isEditing = false;  // Set flag to false when opening the modal for adding a task
  currentEditingTaskId = null;
  openModal();
});

// Handle form submission
addNewTaskForm?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  if (!newTaskTitleInput?.value.trim() || !newTaskDetailsInput?.value.trim()) {
    alert("Please fill in both title and details.");
    return;
  }

  if (isEditing && currentEditingTaskId) {
    // Editing existing task
    const taskToEdit = tasksArray.find((task) => task.id === currentEditingTaskId);
    if (taskToEdit) {
      taskToEdit.title = newTaskTitleInput.value;
      taskToEdit.details = newTaskDetailsInput.value;
      saveTasksToLocalStorage("tasksArray", tasksArray);
      console.log("Task Updated:", taskToEdit);
    }
  } else {
    // Adding a new task
    const newTaskObject: INewTaskObject = {
      id: uuid(),
      title: newTaskTitleInput.value,
      details: newTaskDetailsInput.value,
      isCompleted: false,
    };
    tasksArray.push(newTaskObject);
    saveTasksToLocalStorage("tasksArray", tasksArray);
    console.log("New Task Created:", newTaskObject);
  }

  newTaskTitleInput.value = "";
  newTaskDetailsInput.value = "";
  closeModal();
  displayTasks(tasksArray);
});

// Function to edit a task
export function editTask(id: string) {
  isEditing = true;
  currentEditingTaskId = id;  // Set the ID of the task being edited

  const taskToEdit = tasksArray.find((task) => task.id === id);
  if (taskToEdit && addNewTaskForm && newTaskTitleInput && newTaskDetailsInput) {
    // Populate the form with the current task's details
    newTaskTitleInput.value = taskToEdit.title;
    newTaskDetailsInput.value = taskToEdit.details;
    openModal();
  } else {
    console.error("Task not found or required DOM elements are missing.");
  }
}
