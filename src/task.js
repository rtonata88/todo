export const addTask = (taskDescription) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  let task = {
    description: taskDescription,
    completed: false,
    index: tasks.length,
  };
  tasks.push(task);
  storeTask(tasks);

  displayTasks();
};

/**
 * Marks the task as complete if task was incomplete or marks incomplete if task was complete
 * @param {*} taskId - the task index ID to be marked
 * @param {*} checkboxValue - the value True/False of the checkbox
 */
export const toggleTaskCompleteStatus = (taskId, checkboxValue) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task) => {
    if (task.index === taskId) {
      checkboxValue ? (task.completed = true) : (task.completed = false);
    }
  });

  storeTask(tasks);
};

/**
 * Delete the selected task
 * @param {*} taskId - The Index ID of the task to be deleted
 */
export const deleteTask = (taskId) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach((task, arrayIndex) => {
    if (task.index === taskId) {
      tasks.splice(arrayIndex, 1);
    }
  });

  storeTask(tasks);

  displayTasks();
};

export const displayTasks = () => {
  let template = "";
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      template += `<div class="tasks">
                    <input type="checkbox" class="task-status"  data-id="${task.index}"> ${task.description}
                    </div>`;
    });
  }
  const taskListContainer = document.getElementById("taskListContainer");
  taskListContainer.innerHTML = template;
};

/**
 * Stores the array of task objects to the localStorage
 * @param {*} tasks - the array of objects to store
 */
const storeTask = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
