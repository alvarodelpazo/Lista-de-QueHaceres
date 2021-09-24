//Selectores
const todoInput2 : HTMLInputElement = document.querySelector(".todo-input");
const todoButton2 : HTMLButtonElement = document.querySelector(".todo-button");
const todoList2 : HTMLUListElement = document.querySelector(".todo-list");
const filterOption2 : HTMLSelectElement = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos2);
todoButton2.addEventListener("click", addTodo2);
todoList2.addEventListener("click", deleteCheck2);
filterOption2.addEventListener("click", filterToDo2);

//Functions
function addTodo2(event: Event) : void {
    event.preventDefault();
    const todoDiv : HTMLDivElement = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo : HTMLLIElement = document.createElement("li");
    saveLocalTodos2(todoInput2.value);
    newTodo.innerText = todoInput2.value;
    todoDiv.appendChild(newTodo);

    const completedButton : HTMLButtonElement = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton : HTMLButtonElement = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList2.appendChild(todoDiv);
    todoInput2.value = "";
}

function deleteCheck2(e : Event) : void {
    const item : HTMLElement = <HTMLElement>e.target;
    if (item.classList[0] === "trash-btn") {
        const todo : Partial<HTMLDivElement> = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos2((todo.children[0] as HTMLLIElement).innerText);
        todo.addEventListener("transitionend", function ()
        {
            todo.remove(); 
        });
    }
    if (item.classList[0] === "complete-btn"){
        item.parentElement.classList.toggle("completed");
    }
}

function filterToDo2(e : Event) : void {
    const todos : NodeList = todoList2.childNodes;
    todos.forEach(function (todo : Partial<HTMLDivElement>)
    {
        switch ((e.target as HTMLSelectElement).value)
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                } else 
                {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                } else 
                {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos2(todo : string) {
    let todos : string[];
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos2() : void {
    let todos : string[];
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo : string){
        const todoDiv : HTMLDivElement = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo : HTMLLIElement = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton : HTMLButtonElement = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton : HTMLButtonElement = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList2.appendChild(todoDiv);
    });
}

function removeLocalTodos2(todo : string) : void {
    let todos : string[];
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}