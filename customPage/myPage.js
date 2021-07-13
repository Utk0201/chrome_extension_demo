$(function () {
    $('h1').click(function () {
    });
    $('.todo-forms').hide();
    $('#toggle-form').click(function () {
        $('.todo-forms').slideToggle("slow", function () { });
    });
});

document.addEventListener("DOMContentLoaded", getTodos);
const todoButton = document.querySelector(".todo-button");
const todoInput = document.querySelector("#add-task");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
    //Prevent natural behaviour
    e.preventDefault();
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("a-task");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    //Save to local - do this last
    //Save to local
    saveLocalTodos(todoInput.value);
    //
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    // todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    // my lines
    const btns = document.createElement("div");
    btns.classList.add("edit-delete-buttons");
    btns.appendChild(completedButton);
    btns.appendChild(trashButton);
    // my lines
    // todoDiv.appendChild(trashButton);
    todoDiv.appendChild(btns);
    //attach final Todo
    todoList.appendChild(todoDiv);
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [{}];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push({taskName:todo,taskDone:0});
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
    const item = e.target;
    if (item.classList[1] === "fa-trash") {
        const toBeDeleted = e.target.parentElement.parentElement.parentElement;
        removeLocalTodos(toBeDeleted);
        toBeDeleted.remove();
    }
    if (item.classList[1] === "fa-check") {
        const todo = item.parentElement.parentElement.parentElement;
        let toStrike = todo.children[0];
        modifyTask(todo);
        toStrike.classList.toggle("task-done");
    }
}

function modifyTask(todo){
    //
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todo);
    console.log(todo.innerText);
    for(let task of todos){
        console.log(task);
        if(task.taskName===todo.innerText){
            console.log("Yayyy!!!");
            task.taskDone=1-task.taskDone;
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("a-task");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.taskName;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        if(todo.taskDone===1){
            newTodo.classList.add("task-done");
        }
        // todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        // my lines
        const btns = document.createElement("div");
        btns.classList.add("edit-delete-buttons");
        btns.appendChild(completedButton);
        btns.appendChild(trashButton);
        // my lines
        // todoDiv.appendChild(trashButton);
        todoDiv.appendChild(btns);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}