/**
 * Stores the array of task objects to the localStorage
 * @param {*} tasks - the array of objects to store
 */
const storeTask = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
/**
 * Marks the task as complete if task was incomplete or marks incomplete if task was complete
 * @param {*} taskId - the task index ID to be marked
 * @param {*} checkboxValue - the value True/False of the checkbox
 */
export const toggleTaskCompleteStatus = (taskId, checkboxValue) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    if (task.index === parseInt(taskId, 10)) {
      if (checkboxValue) {
        task.completed = true;
      } else {
        task.completed = false;
      }
    }
  });

  storeTask(tasks);

  displayTasks();
};

export const displayTasks = () => {
  let template = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length) {
    tasks.forEach((task) => {
      template += `<div class="tasks" data-id="${task.index}">
                    <input type="checkbox" class="task-status" ${
                      task.completed ? "checked" : ""
                    } data-id="${task.index}"> 
                       
                        <textarea ${
                          task.completed
                            ? "class='textarea complete'"
                            : "class='textarea'"
                        }" id="${task.index}" 
                        data-id="${task.index}" rows="1">${
        task.description
      }</textarea>
                      <button type="button" class="delete-button" data-id="${
                        task.index
                      }" > 
                          <i class="far fa-trash-alt" ></i>
                      </button>
                    </div>`;
    });

    const clearAllContainer = document.getElementById("clear-all");
    clearAllContainer.style.display = "block";
  } else {
    const clearAllContainer = document.getElementById("clear-all");
    clearAllContainer.style.display = "none";
  }

  const taskListContainer = document.getElementById("taskListContainer");
  taskListContainer.innerHTML = template;

  const checkboxes = document.querySelectorAll(".task-status");
  [...checkboxes].forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      toggleTaskCompleteStatus(e.target.dataset.id, e.target.checked);
    });
  });

  const textarea = document.querySelectorAll("textarea");
  [...textarea].forEach((textarea) => {
    textarea.addEventListener("focusin", () => {
      textarea.classList.remove("complete");
      textarea.parentElement.style.background = "#fff3bf";
    });

    textarea.addEventListener("focusout", () => {
      textarea.parentElement.style.background = "";
      if (tasks[textarea.dataset.id].completed) {
        textarea.classList.add("complete");
      }
    });
  });

  editTask();
  deleteTask();
};

export const addTask = (taskDescription) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  const task = {
    description: taskDescription,
    completed: false,
    index: tasks.length,
  };
  tasks.push(task);
  storeTask(tasks);

  displayTasks();
};

const editTask = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const textareas = document.querySelectorAll("textarea");

  [...textareas].forEach((textarea, index) => {
    textarea.addEventListener("change", (e) => {
      if (tasks[index].index === parseInt(e.target.dataset.id, 10)) {
        tasks[index].description = textarea.value;
        storeTask(tasks);
        displayTasks();
      }
    });
  });
};

/**
 * Delete the selected task
 * @param {*} taskId - The Index ID of the task to be deleted
 */
const deleteTask = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const taskId = parseInt(button.dataset.id, 10);
      tasks = tasks.filter((task) => task.index !== taskId);
      tasks = reIndex(tasks); // re-index the array
      storeTask(tasks); // Store a re-indexed array back to the storage
      displayTasks();
    });
  });
};

export const clearCompleted = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const incompleteTasks = tasks.filter((task) => task.completed === false);
  tasks = reIndex(incompleteTasks);
  storeTask(tasks);
  displayTasks();
};

const reIndex = (tasks) => {
  tasks.forEach((task, index) => {
    task.index = index;
  });
  return tasks;
};
