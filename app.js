const form = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const remaingTasks = document.querySelector("#remaining-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const totalTasks = document.querySelector("#total-tasks");
const inputTasks = document.querySelector("#todo-form input");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
if(localStorage.getItem("tasks")){
    tasks.map(task => createTask(task));
}
form.addEventListener("submit", e => {
    e.preventDefault();
    let inputTask = inputTasks.value;
    if(inputTask == ""){
        return;
    }
    const task = {
        id: new Date().getTime(),
        name : inputTask,
        isCompleted: false,
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(task);
    form.reset();
    inputTasks.focus();
})

function createTask(task){
    let taskElem = document.createElement("li");
    taskElem.setAttribute("id", task.id);
    if(task.isCompleted){
        taskElem.classList.add("complete");
    }
    let domMarkUp = `
    <div>
    <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted? "checked": ""}>
    <span ${!task.isCompleted? "contenteditable" : ""}> ${task.name}</span>
    </div>
    <button title="Remove the "${task.name}" task " class="remove-task">Delete</button>
    `
    taskElem.innerHTML = domMarkUp;
    todoList.appendChild(taskElem);
    keepOfTasks();
}
function keepOfTasks(){
    const completdTaskArr = tasks.filter(task => task.isCompleted == true);
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completdTaskArr.length;
    remaingTasks.textContent = tasks.length - completdTaskArr.length;
}

todoList.addEventListener("click", e =>{
    if(e.target.classList.contains("remove-task")){
        let taskId = e.target.closest("li").id;
        deleteTask(taskId);
    }
})
function deleteTask(id){
    tasks = tasks.filter(task => task.id !== parseInt(id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(id).remove();
    keepOfTasks();
}
todoList.addEventListener("input", e =>{    
    let taskId = e.target.closest("li").id;
    updateTask(taskId, e.target)
})
function updateTask(id, el){
    const task = tasks.find(task => task.id == parseInt(id));
    if(el.hasAttribute("contenteditable")){
        task.name = el.textContent;
    }else{
        let span = el.nextElementSibling
        let par = el.closet("li");
        task.isCompleted = !task.isCompleted
        if(task.isCompleted){
            span.removeAttribute("contenteditable")
            par.classList.add("complete")
        }else{
            span.setAttribute("contenteditable")
            par.classList.remove("complete")
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    keepOfTasks();
}