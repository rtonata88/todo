import "./style.css";
import { addTasks, toggleTaskCompleteStatus, displayTasks } from "./task.js";

const main = () => {
  //Display the tasks on page load
  displayTasks();

  const taskInput = document.getElementById("task-input");

  taskInput.addEventListener("keyup", (e) => {
    if (e.key === 13) {
      addTasks(taskInput.value);
    }
  });

  const checkboxes = document.querySelectorAll(".task-status");
  checkboxes.forEach((checkbox) => {
    console.log(checkbox);
  });
};

window.onload = main;
