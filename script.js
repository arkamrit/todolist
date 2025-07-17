// Array to hold tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to update task counter
function updateTaskCounter() {
  const checkboxes = document.querySelectorAll("#taskList input[type='checkbox']");
  const incompleteCount = [...checkboxes].filter(cb => !cb.checked).length;
  document.getElementById("taskCounter").innerText =
    `${incompleteCount} task${incompleteCount !== 1 ? 's' : ''} left`;
}

// Function to render a task to the list
function renderTask(taskText, isCompleted = false) {
  let li = document.createElement("li");

  // --- LEFT: Checkbox + Text ---
  let leftSide = document.createElement("div");
  leftSide.className = "task-content";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;

  let taskSpan = document.createElement("span");
  taskSpan.innerText = taskText;

  leftSide.appendChild(checkbox);
  leftSide.appendChild(taskSpan);

  // --- RIGHT: Edit + Delete buttons ---
  let rightSide = document.createElement("div");
  rightSide.className = "task-actions";

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  rightSide.appendChild(editBtn);
  rightSide.appendChild(deleteBtn);

  // Add both sides to list item
  li.appendChild(leftSide);
  li.appendChild(rightSide);

  // Add completed style if needed
  if (isCompleted) {
    li.classList.add("completed");
  }

  // Checkbox toggle logic
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    const index = [...document.querySelectorAll("#taskList li")].indexOf(li);
    tasks[index].completed = checkbox.checked;
    saveTasks();
    updateTaskCounter();
  });

  // Delete logic
  deleteBtn.onclick = function () {
    const index = [...document.querySelectorAll("#taskList li")].indexOf(li);
    tasks.splice(index, 1);
    li.remove();
    updateTaskCounter();
    saveTasks();
  };

  // Edit logic
  editBtn.onclick = function () {
    const index = [...document.querySelectorAll("#taskList li")].indexOf(li);

    if (editBtn.innerText === "Edit") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskSpan.innerText;
      input.style.marginLeft = "10px";

      leftSide.replaceChild(input, taskSpan);
      editBtn.innerText = "Save";
    } else {
      const input = leftSide.querySelector("input[type='text']");
      const newText = input.value.trim();

      if (newText === "") {
        alert("Task cannot be empty!");
        return;
      }

      taskSpan = document.createElement("span");
      taskSpan.innerText = newText;
      leftSide.replaceChild(taskSpan, input);
      editBtn.innerText = "Edit";

      tasks[index].text = newText;
      saveTasks();
    }
  };

  document.getElementById("taskList").appendChild(li);
}



// Function to add a new task
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTask(taskText);
  taskInput.value = "";
  updateTaskCounter();
}

// Load tasks on page load
window.onload = function () {
  tasks.forEach(task => {
    renderTask(task.text, task.completed);
  });
  updateTaskCounter();
};
