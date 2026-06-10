const task = document.getElementById("task");
const btnAdd = document.getElementById("add");
const list = document.querySelector(".todo-list");
const counter = document.querySelector(".counter");
let tasks = []; // массив
let filteredTasks = [];

function createTask(newTask) {
  const li = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = newTask.text;
  if (newTask.completed) {
    span.classList.add("completed");
  }

  const btnDelete = document.createElement("button");

  btnDelete.textContent = "Удалить";

  li.appendChild(span);
  li.appendChild(btnDelete);

  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();

    tasks = tasks.filter((item) => item !== newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    renderTasks(tasks);
    counter.textContent = "Задач: " + tasks.length;
  });

  
  li.addEventListener("click", (e) => {
    e.stopPropagation();
    span.classList.toggle("completed");
    newTask.completed = !newTask.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  
  span.addEventListener("dblclick", () => {
    let input = document.createElement("input");
    input.type = "text";
    span.replaceWith(input);
    input.value = newTask.text;
    input.select();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });
    
    function saveEdit() {
      if (input.value.trim() === "") {
        return;
      };
      newTask.text = input.value;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      input.replaceWith(span);
      span.textContent = input.value;
    }
    input.addEventListener("blur", saveEdit);
  });
  return li;
}

task.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnAdd.click();
  }
}); // по нажатию Enter происходит btnAdd.addEventListener(...)

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (task.value.trim() === "") {
    return;
  }

  const taskText = task.value;
  const newTask = {
    text: taskText,
    completed: false,
  };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
  task.value = "";
  counter.textContent = "Задач: " + tasks.length;
});

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  renderTasks(tasks);
  counter.textContent = "Задач: " + tasks.length;
}

const btnAll = document.getElementById("all");
const btnActive = document.getElementById("active");
const btnCompleted = document.getElementById("completed");
function renderTasks(tasksArray) {
  list.innerHTML = "";
  tasksArray.forEach((task) => {
  const li = createTask(task);
  list.appendChild(li);
});
}

btnAll.addEventListener("click", () => {
  renderTasks(tasks);
})

btnActive.addEventListener("click", () => {
  renderTasks(tasks.filter((item) => !item.completed));
})

btnCompleted.addEventListener("click", () => {
  renderTasks(tasks.filter((item) => item.completed));
})

