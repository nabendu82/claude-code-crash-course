const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const filterButtons = document.querySelectorAll("#filters button");
const clearBtn = document.getElementById("clear-completed");

// Load saved tasks, or start with an empty list
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Which tasks to show: "all", "active" or "completed"
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach(function (task, index) {
    // Skip tasks that don't match the current filter
    if (currentFilter === "active" && task.done) {
      return;
    }
    if (currentFilter === "completed" && !task.done) {
      return;
    }

    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, text, deleteBtn);
    list.appendChild(li);
  });

  // Count the tasks that are not done yet
  let left = 0;
  tasks.forEach(function (task) {
    if (!task.done) {
      left++;
    }
  });
  count.textContent = left + (left === 1 ? " task left" : " tasks left");

  // Only show "Clear completed" when there is something to clear
  clearBtn.hidden = tasks.length - left === 0;
}

clearBtn.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.done;
  });
  saveTasks();
  renderTasks();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    button.classList.add("active");

    renderTasks();
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
});

renderTasks();
