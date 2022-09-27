// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");




// Event Listener 
document.addEventListener('DOMContentLoaded', getTodos);    /*here we are attaching an event listener to the document or the window and we can check basically if our content on our webpage has loaded and if its loaded then execute the getTodos function */
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



// Functions
function addTodo(event) {
    // Prevent form from submitting 
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
     //Trash button 
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //Append to list
     todoList.appendChild(todoDiv);
     //Clear Todo input value
     todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //Delete todo 
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removelocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        })
    }

    // Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
 

function saveLocalTodos(todo) {
    // To check if i already have things in there
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {                           /* why () khalii ?*/
    // To check if i already have things in there
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash button 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);

    });
}

function removelocalTodos(todo) {
     // To check if i already have things in there
     let todos;
     if(localStorage.getItem('todos') === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
    //  console.log(todo.children[0].innerText); /*checking what we are getting back from this function(ie:what we are clicking on basically)we are getting back the class of todo initially. then did children then [0] then innertext */
    //  console.log(todos.indexOf("goswami")); /*suppose we are getting the index of goswami here */ 
    //  Our aim is to get the index of what we are clicking on here, so we do
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1); /*with this splice method we are saying from all the todos make sure to remove the index 1st or 2nd or 3rd etc whatever element: this is the first argument we are passing in here ie: from what position do we wanna remove an element. and the second argument is how many do we wanna remove that is 1 */
     // till now we removed it from the array but we still need to set back that local storage
     localStorage.setItem('todos', JSON.stringify(todos));
}












// through this we are just removing the opacity, the element still stays there: gotta remove it properly. when the animation finishes we wanna remove the element
// Using 'Transtionend' its gonna wait and only execute when the transition(ie: the fall animation) is completed