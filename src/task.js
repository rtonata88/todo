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
  const tasks = JSON.parse(localStorage.getItem("tasks"));

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
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      template += `<div class="tasks">
                    <input type="checkbox" class="task-status" ${
                      task.completed ? "checked" : ""
                    } data-id="${task.index}"> 
                        <span ${task.completed ? "class='complete'" : ""}>
                            ${task.description}
                        </span>
                        <textarea class="textarea" data-id="${
                          task.index
                        }" cols="40">${task.description}</textarea>
                    </div>`;
    });
  }
  const taskListContainer = document.getElementById("taskListContainer");
  taskListContainer.innerHTML = template;

  const checkboxes = document.querySelectorAll(".task-status");
  [...checkboxes].forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      toggleTaskCompleteStatus(e.target.dataset.id, e.target.checked);
    });
  });

  editTask();
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
  let tasks = JSON.parse(localStorage.getItem("tasks"));
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
