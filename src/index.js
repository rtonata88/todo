import "./style.css";
import { addTask, toggleTaskCompleteStatus, displayTasks } from "./task.js";

const main = () => {
  //Display the tasks on page load
  displayTasks();

  const taskInput = document.getElementById("task-input");

  taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addTask(taskInput.value);
    }
    taskInput.value = "";
  });

  const checkboxes = document.querySelectorAll(".task-status");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      toggleTaskCompleteStatus(checkbox.dataset.id, checkbox.checked);
    });
  });
};

window.onload = main;
