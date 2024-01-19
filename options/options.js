const timeOptions=document.getElementById("time-options");
timeOptions.addEventListener("change",(event)=>{  
    const val=event.target.value;
    if(val<1 || val>60){
        timeOptions.value=25;
    }

})

const saveBtn=document.getElementById("save-btn");
saveBtn.addEventListener("click",()=>{
    chrome.storage.local.set({
        timer:0,
        timeOptions:timeOptions.value,
        isRunning:false
    });
})

chrome.storage.local.get(["timeOptions"],(res)=>{
    timeOptions.value=res.timeOptions?res.timeOptions:25;
})