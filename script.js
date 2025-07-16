function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  let li = document.createElement("li");

  // Create checkbox
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";

  // When checkbox is checked, toggle 'completed' class
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  });

  // Create span to hold the task text
  let taskSpan = document.createElement("span");
  taskSpan.innerText = taskText;

  // Create delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = function () {
    li.remove();
  };

  // Append everything
  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";
}
