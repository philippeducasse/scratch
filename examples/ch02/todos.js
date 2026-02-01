const todos = ["Clean the kitchen", "Water the plants", "Take the bins out", "test"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todos-list");

// Initialise the view

for (const todo of todos) {
  todoList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener("input", () => {
  addTodoButton.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener("keydown", ({ key }) => {
  if (key === "Enter" && addTodoInput.value.length >= 3) {
    addTodo();
  }
});
addTodoButton.addEventListener("click", () => {
  addTodo();
});

// Functions

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = todo;
  span.addEventListener("dblclick", () => {
    const idx = todos.indexOf(todo);

    todoList.replaceChild(renderTodoInEditMode(todo), todoList.childNodes[idx]);
  });

  const submitbtn = document.createElement("button");
  submitbtn.classList.add("btn");
  submitbtn.textContent = "Done";
  submitbtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    markTodoAsCompleted(idx);
  });

  li.appendChild(span);
  li.appendChild(submitbtn);

  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo;

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("btn");

  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn");

  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    const idx = todos.indexOf(todo);
    todoList.replaceChild(renderTodoInReadMode(todo), todoList.childNodes[idx]);
  });

  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);

  return li;
}

function addTodo() {
  clearErrors();
  const description = addTodoInput.value;

  if (todos.includes(description)) {
    displayError("Todo already exisits!");
    return;
  }

  todos.push(description);

  todoList.append(renderTodoInReadMode(description));

  addTodoInput.value = "";
  addTodoButton.disabled = true;

  readTodoAloud(description);
}

function markTodoAsCompleted(index) {
  const todo = todoList.children[index].firstElementChild;
  todo.classList.add("done");
}

function deleteTodo(index) {
  todos.splice(index, 1);
  todoList.childNodes[index].remove();
}

function updateTodo(index, updatedDescription) {
  todos[index] = updatedDescription;
  const todo = renderTodoInReadMode(updatedDescription);
  todoList.replaceChild(todo, todoList.childNodes[index]);
}

function displayError(message) {
  const inputField = document.getElementById("input-field");
  const error = document.createElement("span");
  error.textContent = message;
  error.classList.add("error");

  inputField.append(error);
}

function clearErrors() {
  const errors = document.getElementsByClassName("error");
  while (errors.length > 0) {
    errors[0].remove();
  }
}

function readTodoAloud(description) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(description);
  window.speechSynthesis.speak(utterance);
}
