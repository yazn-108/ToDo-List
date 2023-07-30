"use strict";
let
input = document.querySelector(".add-task input"),
addButton = document.querySelector(".add-task .plus"),
tasks = document.querySelector(".tasks"),
noTasks = document.querySelector(".tasks .no-tasks"),
tasksCount = document.querySelector(".tasks-count span"),
tasksCompleted = document.querySelector(".completed-tasks span");
input.focus();
addButton.addEventListener("click", (e) =>{
    input.focus();
    e.preventDefault();
    if(input.value !== ""){
        let taskNotExists = true;
        let existingTasks = tasks.querySelectorAll(".task-text");
        existingTasks.forEach((task) => {
            if (task.innerHTML === input.value) {
                taskNotExists = false;
                Swal.fire({
                    title: 'Task already exists',
                    icon: 'warning',
                    iconHtml: '!',
                    color: "#009688",
                    confirmButtonColor: '#009688',
                    confirmButtonText: 'OK'
                });
            };
        });
        if (taskNotExists === true) {
            noTasks.remove();
            let task = document.createElement("div");
            task.className = "task-box";
            let span = document.createElement("span");
            span.innerHTML = input.value;
            span.className = "task-text";
            span.setAttribute("onclick", "completed(this);")
            task.appendChild(span);
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.textContent = "Delete";
            task.appendChild(deleteButton);
            tasks.appendChild(task);
            addButton.style = `transform: rotate(40deg);`;
            setTimeout(()=>{
                addButton.style = `transform: rotate(0deg);`;
            },300);
            let storedTasks = localStorage.getItem("tasks");
            let tasksArray = JSON.parse(storedTasks) || [];
            let newTask = {task: input.value,completed: false};
            tasksArray.push(newTask);
            let arrayToJson = JSON.stringify(tasksArray);
            localStorage.setItem("tasks",arrayToJson);
            input.value = "";
            tasksCount.innerHTML = tasks.childElementCount;
        };
    }else{
        Swal.fire({
            title: 'Write a task',
            icon: 'question',
            iconHtml: '!',
            color: "#009688",
            confirmButtonColor: '#009688',
            confirmButtonText: 'ok'
        });
    };
});
document.addEventListener("click",(e) =>{
    if(e.target.className == "delete"){
        e.target.parentNode.remove();
        let taskValue = e.target.parentNode.querySelector('.task-text').innerText;
        let tasksArray = JSON.parse(localStorage.getItem("tasks"));
        let taskIndex = tasksArray.findIndex(task => task.task === taskValue);
        tasksArray.splice(taskIndex, 1);
        let updatedTasks = JSON.stringify(tasksArray);
        localStorage.setItem("tasks", updatedTasks);
        tasksCount.innerHTML = tasks.childElementCount;
        if(tasks.childElementCount === 0){
            tasks.appendChild(noTasks);
        };
    };
    if(e.target.classList.contains('task-text')){
        e.target.classList.toggle("finished");
    };
    tasksCompleted.innerHTML = 
    document.querySelectorAll(".tasks .task-box .finished").length;
});
let deleteTasks = document.querySelector(".delete-tasks");
deleteTasks.addEventListener("click",() => {
    let allTasks = document.querySelectorAll(".tasks .task-box");
    allTasks.forEach(function(task) {
        task.remove();
        localStorage.clear();
        tasksCount.innerHTML = tasks.childElementCount;
    });
    if(tasks.childElementCount === 0){
        tasks.appendChild(noTasks);
    };
});
let deleteCompleted = document.querySelector(".delete-completed");
deleteCompleted.addEventListener("click",() => {
    let allCompleted = document.querySelectorAll(".tasks .task-box .finished");
    allCompleted.forEach((e)=>{
        let tasksArray = JSON.parse(localStorage.getItem("tasks"));
        let filter = tasksArray.filter(item =>{return item.completed === false})
        let updatedTasks = JSON.stringify(filter);
        localStorage.setItem("tasks", updatedTasks);
        e.parentElement.remove();
        tasksCount.innerHTML = tasks.childElementCount;
        if(tasks.childElementCount === 0){
            tasks.appendChild(noTasks);
        };
    });
});
if(localStorage.getItem("tasks") !== null){
let storedTasks = JSON.parse(localStorage.getItem("tasks"))
storedTasks.forEach((e) =>{
    noTasks.remove();
    let task = document.createElement("div");
    task.className = "task-box";
    let span = document.createElement("span");
    span.innerHTML = e.task;
    span.className = "task-text";
    span.setAttribute("onclick", "completed(this);")
    task.appendChild(span);
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    task.appendChild(deleteButton);
    tasks.appendChild(task);
    tasksCount.innerHTML = tasks.childElementCount;
    tasksCompleted.innerHTML = 
    document.querySelectorAll(".tasks .task-box .finished").length;
});};
function completed(e) {
    let items = document.querySelectorAll('.task-text');
    let index = Array.prototype.indexOf.call(items, e)
let storedArray = Array.from(JSON.parse(localStorage.getItem('tasks')))
storedArray[index].completed = !storedArray[index].completed
localStorage.setItem("tasks", JSON.stringify(storedArray));
};
let items = document.querySelectorAll('.task-text');
items.forEach((e,i) => {
    let storedArray = JSON.parse(localStorage.getItem('tasks'));
    if(storedArray[i].completed === true){
        e.classList.add("finished");
        tasksCompleted.innerHTML = document.querySelectorAll(".tasks .task-box .finished").length;
    };
});