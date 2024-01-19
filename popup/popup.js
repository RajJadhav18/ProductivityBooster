document.addEventListener("DOMContentLoaded", function() {
    let tasks = [];


    function updateTime(){
        chrome.storage.local.get(["timer","timeOptions"],(res)=>{
            const time= document.getElementById("time");
            const minutes=`${res.timeOptions-Math.ceil(res.timer/60)}`.padStart(2,"0");   
            let seconds="00";
            if(res.timer%60!=0){
                seconds=`${60-res.timer%60}`.padStart(2,"0");  

            }
            time.textContent=`${minutes}:${seconds}`
        })
    }
    updateTime();
    setInterval(updateTime,1000);


    const startTimerBtn=document.getElementById("start-timer-btn")
    startTimerBtn.addEventListener("click",()=>{
        chrome.storage.local.get("isRunning",(res)=>{
           
            chrome.storage.local.set({
                isRunning:!res.isRunning,
            },()=>{
                startTimerBtn.textContent=!res.isRunning?"Pause" : "Start"
            })
        })
       
    })

    const resetTimerBtn=document.getElementById("reset-timer-btn");
    resetTimerBtn.addEventListener("click",()=>{
        chrome.storage.local.set({
            timer:0,
            isRunning:false,
        },()=>{
            startTimerBtn.textContent="Start"
        })
    })  

    
    const addTaskBtn = document.getElementById("add-task-btn");

    addTaskBtn.addEventListener("click", () => addTask());

    
   
    chrome.storage.sync.get(["tasks"],(res)=>{
        tasks=res.tasks?res.tasks:[];
        renderTask1();
    })
    function saveTask(){
        chrome.storage.sync.set({
            tasks,
        })
    }


    const firstTaskInput = document.querySelector(".firstInput");
    addTask(firstTaskInput);

    function renderTask(taskNum) {
        const taskRow = document.createElement("div");

        const text = document.createElement("input");
        text.type = "text";
        text.placeholder = "Enter a task";
        text.value = tasks[taskNum];
        text.className = "task-input";
        text.addEventListener("change", () => {
            tasks[taskNum] = text.value;
            console.log(tasks);
            saveTask();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.innerHTML = "completed";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            deleteTask(taskNum);
            
        });

        taskRow.appendChild(text);
        taskRow.appendChild(deleteBtn);

        const taskContainer = document.getElementById("task-container");
        taskContainer.appendChild(taskRow);
    }

    function addTask() {
        const taskNum = tasks.length;
        tasks.push("");
        renderTask(taskNum);
        saveTask();
    }

    function deleteTask(taskNum) {
        tasks.splice(taskNum, 1);
        renderTask1();
        saveTask();
    }

    function renderTask1() {
        const taskContainer = document.getElementById("task-container");
        taskContainer.textContent = "";
        tasks.forEach((taskText, taskNum) => {
            renderTask(taskNum);
        });
    }
});
