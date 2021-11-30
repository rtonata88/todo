import './style.css';

const tasks = [
  {
    description: 'Finish the farms report',
    completed: false,
    index: 0,
  },
  {
    description: 'Implement pagination on the reports section',
    completed: false,
    index: 1,
  },
  {
    description: 'Complete the application form',
    completed: false,
    index: 2,
  },
  {
    description: 'Implement the biographicals report',
    completed: false,
    index: 3,
  },
];

const main = () => {
  let template = '';
  tasks.forEach((item) => {
    template += `<div class="tasks">
                  <input type="checkbox" name="" id=""> ${item.description}
                </div>`;
  });

  const taskListContainer = document.getElementById('taskListContainer');
  taskListContainer.innerHTML = template;
};

window.onload = main;
