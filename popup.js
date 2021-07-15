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
    var myState=-1;
    var workPaused=0;
    var breakPaused=0;

    var workSec=-1,breakSec=-1;

    resetWindow();

    function resetWindow() {
        myState=-1;
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
            workSec=workInput.value*60;
            breakSec=breakInput.value*60;
            // console.log("Work minutes: ",workSec);
            // console.log("Break minutes: ",breakSec);
            doWork();
        });
    }

    function doWork(workDuration) {
        myState=1;
        workPaused=0;
        setInterval(updateWork,1000);
        workTime.innerText=workSec;
        console.log("Doing work");
        breakWindow.hide("slow");
        timerWindow.hide("slow");
        workWindow.show("slow");
        // buttons
        resetAll.addEventListener("click", resetWindow);
        pauseWorkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            workPaused=1-workPaused;
            if(workPaused===1){
                pauseWorkBtn.innerText="Resume";
            }
            else{
                pauseWorkBtn.innerText="Pause";
            }
            console.log("Pausing work");
        });
        takeBreakBtn.addEventListener("click", (e)=>{
            e.preventDefault();
            takeBreak();
        });
        //////////////////////////////////////////
        if(workDuration!=-1) console.log("Shifted to work mode for ", workDuration);
        else console.log("Resuming work from __");
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://i.pinimg.com/564x/63/00/a7/6300a74eae90be4938bb39257e3fe6d9.jpg')";
        bodyContent.style.backgroundSize = "cover";
    }

    function takeBreak() {
        myState=0;
        breakPaused=0;
        setInterval(updateBreak,1000);
        breakTime.innerText=breakSec;
        workWindow.hide("slow");
        timerWindow.hide("slow");
        breakWindow.show("slow");
        // console.log("Taking a break!!");
        //  buttons
        resetAll.addEventListener("click", resetWindow);
        pauseBreakBtn.addEventListener("click",(e)=>{
            breakPaused=1-breakPaused;
            e.preventDefault();
            if(breakPaused===1){
                pauseBreakBtn.innerText="Resume";
            }
            else{
                pauseBreakBtn.innerText="Pause";
            }
            console.log("Pausing break");
        })
        goToWorkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            doWork(-1);
        });
        //////////////////////////////////////////
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://image.freepik.com/free-photo/take-break-text-cubes-white-background-time-relax-stop-work_274234-834.jpg')";
        bodyContent.style.backgroundSize = "cover";
    }

    function updateWork(){
        if(myState===1 && workPaused!=1){
            workTime.innerHTML=`${Math.floor(workSec/60)}:${workSec%60}`;
            workSec--;
        }
    }
    function updateBreak(){
        if(myState===0 && breakPaused!=1){
            breakTime.innerHTML=`${Math.floor(breakSec/60)}:${breakSec%60}`;
            breakSec--;
        }
    }
});