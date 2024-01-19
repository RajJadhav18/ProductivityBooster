chrome.alarms.create("ProductivityBooster", {
    periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "ProductivityBooster") {
        chrome.storage.local.get(["timer", "isRunning","timeOptions"], (res) => {
            if (res.isRunning) {
                let timer = res.timer + 1;
                let isRunning = true;
                if (timer === 60*res.timeOptions){
                    
                        this.registration.showNotification("Productivity Booster",{
                            body:`You have been working for ${res.timeOptions} minutes. Take a break!`,
                            icon:"icon32.png",
                        })
                    

                    timer = 0;
                    isRunning = false;
                   

                }
                chrome.storage.local.set({
                    timer,
                    isRunning,
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning","timeOptions"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        timeOptions: "timeOptions" in res ? res.timeOptions:25,
        isRunning: "isRunning" in res ? res.isRunning : false,
    })
})
