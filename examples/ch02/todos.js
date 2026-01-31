const todos = ["Clean the kitchen", "Water the plants", "Take the bins out"]

const addTodoInput = document.getElementById("todo-input")
const addTodoButton = document.getElementById("add-todo-btn")
const todoList = document.getElementById("todos-list")

// Initialise the view

for (const todo of todos){
    todoList.append(renderTodosInReadMode(todo))
}

addTodoInput.addEventListener("input", () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener("keydown", ({key}) => {
    if (key === "Enter" && addTodoInput.value.length >=3){
        addTodo()
    }
})
addTodoButton.addEventListener("click", () => {
    addTodo()
})

// Functions

function renderTodosInReadMode(todo){
    // 
}

function addTodo(){
    // 
}