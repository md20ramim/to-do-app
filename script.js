// Finding elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.querySelector("#lists");
const messageElement = document.getElementById("message");

// Create message
const showMessage = (text,status) =>
{
    messageElement.textContent=text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = "";
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
}

// Create todo
const createTodo=(todoId,todoValue)=>
{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style")
    todoElement.innerHTML=`
    <span>${todoValue}</span>
    <span>
        <button class="btn" id="deleteButton">
            <i class="fa fa-trash"></i>
        </button>
    </span>
    `;
    todoLists.appendChild(todoElement);
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodo);
}

// Delete Todo
const deleteTodo = (event)=>
{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage("todo is deleted","danger");

    let todos = getTodosFormLocalStorage();
    todos = todos.filter((todo)=>todo.todoId!==selectedTodo.id);
    localStorage.setItem("mytodos",JSON.stringify(todos));
}
// getTodosFormLocalStorage
const getTodosFormLocalStorage=()=>
{
    return localStorage.getItem("mytodos")?JSON.parse(localStorage.getItem("mytodos")):[];
}
// adding function
const addTodo = (event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;

    // unique id
    const todoId = Date.now().toString();
    createTodo(todoId,todoValue);
    showMessage("Todo is added","success");

    // create todos
    const todos = getTodosFormLocalStorage();
    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
    todoInput.value="";
}
// Load todos
const loadTodos=()=>
{
    const todos = getTodosFormLocalStorage();
    todos.map((todo)=>createTodo(todo.todoId,todo.todoValue));
}
// adding listener
todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);