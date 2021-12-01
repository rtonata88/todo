import './style.css';
import { addTask, displayTasks } from './task.js';

const main = () => {
  // Display the tasks on page load
  displayTasks();

  const taskInput = document.getElementById('task-input');

  taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      addTask(taskInput.value);
      taskInput.value = '';
    }
  });
};

window.onload = main;
