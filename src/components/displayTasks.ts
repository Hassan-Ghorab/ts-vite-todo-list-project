import { INewTaskObject } from "../interfaces";
import { isEditing, setIsEditing } from "../components/modal";
import { completeTask } from "./completeTask";
import { deleteTask } from "./deleteTask";
import { openDeleteModal, openModal, updateModalTitle } from "./modal";
import { editTask } from "./addTask";

const list = document.getElementById("list") as HTMLUListElement | null;

export function displayTasks(tasksArray: INewTaskObject[]) {
  // Clear the current list before rendering new tasks
  if (list) {
    list.innerHTML = ""; // Optional: clear previous tasks to avoid duplication
  }

  if (tasksArray.length > 0) {
    // Generate the HTML string for each task
    const tasksHTML = tasksArray
      .map((task) => {
        return `
        <li class="list-item">
          <div>
            <h2 class="${task.isCompleted ? "task-title-completed" : ""}">${
          task.title
        }</h2>
            <p>${task.details}</p>
          </div>

          <div class="list-item__actions">
            <button class="list-item__actions-btn delete-btn" data-task-id="${
              task.id
            }">
              <svg fill="currentColor" viewBox="0 0 16 16" height="1rem" width="1rem">
                <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0z"/>
              </svg>
            </button>

            <button class="list-item__actions-btn edit-btn" data-task-id="${
              task.id
            }">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" height="1rem" width="1rem">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </button>

            <button class="list-item__actions-btn complete-btn ${
              task.isCompleted ? "completed-btn" : ""
            }" data-task-id="${task.id}">
              <svg viewBox="0 0 512 512" fill="currentColor" height="1rem" width="1rem">
                <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>
            </button>
          </div>
        </li>
      `;
      })
      .join("");

    if (list) {
      list.innerHTML = tasksHTML;
    }
  } else {
    if (list) {
      list.innerHTML = `
        <li class="list-item no-items">
          <h2>No items yet</h2>
        </li>
      `;
    }
  }

  const completeBtn = document.querySelectorAll(".complete-btn");
  completeBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = (e.currentTarget as HTMLElement).getAttribute(
        "data-task-id"
      );
      if (taskId) {
        completeTask(taskId);
      }
    });
  });

  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = (e.currentTarget as HTMLElement).getAttribute(
        "data-task-id"
      );

      if (taskId !== null) {
        openDeleteModal();
        deleteTask(taskId);
      } else {
        console.error("Task ID is missing!");
      }
    });
  });

  const editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const taskId = (e.currentTarget as HTMLElement).getAttribute(
        "data-task-id"
      );

      setIsEditing(true); // Set isEditing to true

      updateModalTitle(); // Update modal title after opening the modal
      if (taskId !== null) {
        openModal(); // Open the modal
        editTask(taskId);
      } else {
        console.error("Task ID is missing!");
      }
    });
  });
}
