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
        e.parentElement.remove();
        tasksCount.innerHTML = tasks.childElementCount;
        if(tasks.childElementCount === 0){
            tasks.appendChild(noTasks);
        };
    });
});