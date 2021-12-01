/**
 * Adds a task to the list of tasks
 * @param {*} taskDescription - The task description to be added
 */
export const addTask = (taskDescription) => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    let task = {
        description: taskDescription,
        completed: false,
        index: tasks.length - 1,
      },
    tasks.push(task);
    storeTask(tasks);
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
}

/**
 * Stores the array of task objects to the localStorage
 * @param {*} tasks - the array of objects to store
 */
const storeTask = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
