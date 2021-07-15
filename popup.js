$(function () {
    $('#home').click(function () {
        console.log("clicked")
        chrome.runtime.sendMessage({
            from: "popup",
            action: "goToHomePage"
        })
    });


    var timerWindow = $(".set-time");
    var workWindow = $(".work-window");
    var breakWindow = $(".break-window");
    var workInput = document.querySelector(".work-time");
    var breakInput = document.querySelector(".break-time");
    var resetAll = document.querySelector('.all-reset');
    var bodyContent = document.querySelector("body");
    var setTimings = document.querySelector(".set-work-break");
    var pauseWorkBtn = document.querySelector('.work-pause');
    var pauseBreakBtn = document.querySelector('.break-pause');
    var takeBreakBtn = document.querySelector('.take-break');
    var goToWorkBtn = document.querySelector('.go-to-work');
    var workTime = document.querySelector('#work-time');
    var breakTime = document.querySelector('#break-time');

    var workMin=-1,breakMin=-1;

    resetWindow();

    function resetWindow() {
        // by default , work and break windows are hidden
        workWindow.hide("slow");
        breakWindow.hide("slow");
        timerWindow.show("slow");
        //  contents shown
        setTimings.addEventListener("click", (e) => {
            e.preventDefault();
            // to ensure the input is not blank
            // if(!workInput.value || !breakInput.value){
            //     console.log("Please enter a value");
            //     return;
            // }
            workMin=workInput.value;
            breakMin=breakInput.value;
            console.log("Work minutes: ",workMin);
            console.log("Break minutes: ",breakMin);
            doWork();
        });
    }

    function doWork(workDuration) {
        workTime.innerText=workMin;
        console.log("Doing work");
        breakWindow.hide("slow");
        timerWindow.hide("slow");
        workWindow.show("slow");
        // buttons
        resetAll.addEventListener("click", resetWindow);
        pauseWorkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Pausing work");
        });
        takeBreakBtn.addEventListener("click", takeBreak);
        //////////////////////////////////////////
        if(workDuration!=-1) console.log("Shifted to work mode for ", workDuration);
        else console.log("Resuming work from __");
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://i.pinimg.com/564x/63/00/a7/6300a74eae90be4938bb39257e3fe6d9.jpg')";
        bodyContent.style.backgroundSize = "cover";
    }

    function takeBreak(e) {
        e.preventDefault();
        breakTime.innerText=breakMin;
        workWindow.hide("slow");
        timerWindow.hide("slow");
        breakWindow.show("slow");
        // console.log("Taking a break!!");
        //  buttons
        resetAll.addEventListener("click", resetWindow);
        goToWorkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Pausing break");
            doWork(-1);
        });
        //////////////////////////////////////////
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://image.freepik.com/free-photo/take-break-text-cubes-white-background-time-relax-stop-work_274234-834.jpg')";
        bodyContent.style.backgroundSize = "cover";
    }
});