$(function () {
    $('#home').click(function () {
        console.log("clicked")
        chrome.runtime.sendMessage({
            from: "popup",
            action: "goToHomePage"
        });
    });


    var timerWindow = $(".set-time");
    var workWindow = $(".work-window");
    var breakWindow = $(".break-window");
    var workInput = document.querySelector(".set-work-time");
    var breakInput = document.querySelector(".set-break-time");
    var resetAll = document.querySelector('.all-reset');
    var resetAll2 = document.querySelector('.all-reset-two');
    var bodyContent = document.querySelector("body");
    var setTimings = document.querySelector(".set-work-break");
    var pauseWorkBtn = document.querySelector('.work-pause');
    var pauseBreakBtn = document.querySelector('.break-pause');
    var takeBreakBtn = document.querySelector('.take-break');
    var goToWorkBtn = document.querySelector('.go-to-work');
    var showWorkTime = document.querySelector('#show-work-time');
    var showBreakTime = document.querySelector('#show-break-time');
    var viewWorkInterval, viewBreakInterval;
    var refreshRate=300;
    var isBreakPaused=0,isWorkPaused=0;

    clearInterval(viewWorkInterval);
    clearInterval(viewBreakInterval);

    pauseBreakBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        isBreakPaused=1-isBreakPaused;
        if(isBreakPaused===1){
            pauseBreakBtn.innerText = "Resume";
            pauseBreakBtn.style.background="darkgray";
            showBreakTime.style.color="red";
            chrome.runtime.sendMessage("paused", (response) => {
                console.log(response);
            });
        }
        else{
            pauseBreakBtn.innerText = "Pause";
            pauseBreakBtn.style.background="slategray";
            showBreakTime.style.color="dimgray";
            viewBreak();
        }
    });
    pauseWorkBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        isWorkPaused=1-isWorkPaused;
        if(isWorkPaused===1){
            pauseWorkBtn.innerText = "Resume";
            showWorkTime.style.color="red";
            pauseWorkBtn.style.background="darkgray";
            chrome.runtime.sendMessage("paused", (response) => {
                console.log(response);
            });
        }
        else{
            pauseWorkBtn.innerText = "Pause";
            pauseWorkBtn.style.background="slategray";
            showWorkTime.style.color="dimgray";
            viewWork();
        }
    });

    resetAll.addEventListener("click", () => {
        chrome.storage.sync.set({ "workTimeLeft": -1 });
        chrome.storage.sync.set({ "breakTimeLeft": -1 });
        setNewTimings();
    })
    resetAll2.addEventListener("click", () => {
        chrome.storage.sync.set({ "workTimeLeft": -1 });
        chrome.storage.sync.set({ "breakTimeLeft": -1 });
        setNewTimings();
    })

    goToWorkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        viewWork();
    });

    takeBreakBtn.addEventListener("click", (e) => {
        e.preventDefault();
        viewBreak();
    });

    chrome.storage.sync.get("workTimeLeft", (result1) => {
        if (result1.workTimeLeft > 0) {
            clearInterval(viewBreakInterval);
            clearInterval(viewWorkInterval);
            viewWork();
        }
        else {
            chrome.storage.sync.get("breakTimeLeft", (result2) => {
                if (result2.breakTimeLeft > 0) {
                    clearInterval(viewBreakInterval);
                    clearInterval(viewWorkInterval);
                    viewBreak();
                }
                else {
                    // I must enter new timings
                    setNewTimings();
                }
            });
        }
    });

    function setNewTimings() {
        timerWindow.show("slow");
        breakWindow.hide("slow");
        workWindow.hide("slow");
        setTimings.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("You tried to submit!");
            var enteredWork = workInput.value;
            var enteredBreak = breakInput.value;
            console.log("work input : ", workInput.value);
            console.log("break input : ", breakInput.value);
            console.log("Work: ", enteredWork, " Break: ", enteredBreak);
            chrome.storage.sync.set({ "workTimeLeft": enteredWork * 60 }, () => {
                chrome.storage.sync.set({ "breakTimeLeft": enteredBreak * 60 }, () => {
                    console.log("All set");
                    clearInterval(viewBreakInterval);
                    clearInterval(viewWorkInterval);
                    viewWork();
                });
            })
        });
    }

    function viewWork() {
        chrome.runtime.sendMessage("start doing work", (response) => {
            breakWindow.hide("slow");
            timerWindow.hide("slow");
            workWindow.show("slow");
            bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://i.pinimg.com/564x/63/00/a7/6300a74eae90be4938bb39257e3fe6d9.jpg')";
            bodyContent.style.backgroundSize = "cover";
            pauseWorkBtn.innerText = "Pause";
            pauseWorkBtn.style.background="slategray";
            showWorkTime.style.color="dimgray";
            clearInterval(viewBreakInterval);
            clearInterval(viewWorkInterval);
            viewWorkInterval = setInterval(() => {
                chrome.storage.sync.get("workTimeLeft", (result1) => {
                    console.log("Result1 is ", result1.workTimeLeft);
                    if (result1 <= 0) {
                        return;
                    }
                    var tmpHours = Math.floor(result1.workTimeLeft / 60);
                    var shownHours="";
                    if(tmpHours<10){
                        shownHours="0";
                    }
                    shownHours+=tmpHours.toString();

                    var tmpMinutes = Math.floor(result1.workTimeLeft % 60);
                    var shownMinutes="";
                    if(tmpMinutes<10){
                        shownMinutes="0";
                    }
                    shownMinutes+=tmpMinutes.toString();
                    showWorkTime.innerText = `${shownHours}:${shownMinutes}`;
                });
            }, refreshRate);
        });
    }

    function viewBreak() {
        chrome.runtime.sendMessage("take rest", (response) => {
            timerWindow.hide("slow");
            breakWindow.show("slow");
            workWindow.hide("slow");
            bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://image.freepik.com/free-photo/take-break-text-cubes-white-background-time-relax-stop-work_274234-834.jpg')";
            bodyContent.style.backgroundSize = "cover";
            pauseBreakBtn.innerText = "Pause";
            pauseBreakBtn.style.background="slategray";
            showBreakTime.style.color="dimgray";
            clearInterval(viewBreakInterval);
            clearInterval(viewWorkInterval);
            viewBreakInterval = setInterval(() => {
                chrome.storage.sync.get("breakTimeLeft", (result1) => {
                    console.log("Result1 is ", result1.breakTimeLeft);
                    if (result1 <= 0) {
                        return;
                    }
                    var tmpHours = Math.floor(result1.breakTimeLeft / 60);
                    var shownHours="";
                    if(tmpHours<10){
                        shownHours="0";
                    }
                    shownHours+=tmpHours.toString();

                    var tmpMinutes = Math.floor(result1.breakTimeLeft % 60);
                    var shownMinutes="";
                    if(tmpMinutes<10){
                        shownMinutes="0";
                    }
                    shownMinutes+=tmpMinutes.toString();
                    showWorkTime.innerText = `${shownHours}:${shownMinutes}`;
                    showBreakTime.innerText = `${shownHours}:${shownMinutes}`;
                });
            }, refreshRate);
        })
    }
});