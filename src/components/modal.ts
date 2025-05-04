const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal-btn");

const deleteModal = document.getElementById("delete-modal");
const closeDeleteModalBtn = document.getElementById("close-delete-modal-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modalTitle = document.getElementById("modal-title");
const addNewTaskSubmitBtn = document.getElementById("submit");

export let isEditing: boolean = false;

export function setIsEditing(value: boolean) {
  isEditing = value;
}

export function updateModalTitle() {
  if (isEditing && modalTitle && addNewTaskSubmitBtn) {
    modalTitle.textContent = "Edit Task";
    addNewTaskSubmitBtn.textContent = "Save Changes";
  }
}

export function openModal() {
  modal?.classList.remove("display-none");
}

export function closeModal() {
  modal?.classList.add("display-none");
}
closeModalBtn?.addEventListener("click", closeModal);

export function openDeleteModal() {
  deleteModal?.classList.remove("display-none");
}

export function closeDeleteModal() {
  deleteModal?.classList.add("display-none");
}
closeDeleteModalBtn?.addEventListener("click", closeDeleteModal);
cancelBtn?.addEventListener("click", closeDeleteModal);

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement | null;
  if (target && target.classList.contains("modal")) {
    closeModal();
  }

  if (target && target.classList.contains("delete-modal")) {
    closeDeleteModal();
  }
});
