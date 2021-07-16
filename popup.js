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
    var workInput = document.querySelector(".set-work-time");
    var breakInput = document.querySelector(".set-break-time");
    var resetAll = document.querySelector('.all-reset');
    var bodyContent = document.querySelector("body");
    var setTimings = document.querySelector(".set-work-break");
    var pauseWorkBtn = document.querySelector('.work-pause');
    var pauseBreakBtn = document.querySelector('.break-pause');
    var takeBreakBtn = document.querySelector('.take-break');
    var goToWorkBtn = document.querySelector('.go-to-work');
    var showWorkTime = document.querySelector('#show-work-time');
    var showBreakTime = document.querySelector('#show-break-time');
    var myState=-1;
    var workPaused=0;
    var breakPaused=0;
    var workSec=-1,breakSec=-1;
    let clearWork;
    let clearBreak;

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
    });

    takeBreakBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        clearInterval(clearWork);
        takeBreak();
    });

    goToWorkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(clearBreak);
        doWork();
    });

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
            doWork();            
        });
    }

    function doWork() {
        clearWork = setInterval(updateWork,1000);
        myState=1;
        workPaused=0;
        showWorkTime.innerText=workSec;         //  to be changed
        breakWindow.hide("slow");
        timerWindow.hide("slow");
        workWindow.show("slow");
        // buttons
        resetAll.addEventListener("click", resetWindow);
        //////////////////////////////////////////
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://i.pinimg.com/564x/63/00/a7/6300a74eae90be4938bb39257e3fe6d9.jpg')";
        bodyContent.style.backgroundSize = "cover";
    }

    function takeBreak() {
        clearBreak = setInterval(updateBreak,1000);
        console.log("Taking break!!");
        myState=0;
        breakPaused=0;
        showBreakTime.innerText=breakSec;       //  to be changed
        workWindow.hide("slow");
        timerWindow.hide("slow");
        breakWindow.show("slow");
        //  buttons
        resetAll.addEventListener("click", resetWindow);
        //////////////////////////////////////////
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://image.freepik.com/free-photo/take-break-text-cubes-white-background-time-relax-stop-work_274234-834.jpg')";
        bodyContent.style.backgroundSize = "cover";
    }

    function updateWork(){
        if(myState===1 && workPaused!==1 && workSec>0){
            showWorkTime.innerHTML=`${Math.floor(workSec/60)}:${workSec%60}`;
            workSec--;
        }
    }
    function updateBreak(){
        console.log("Updating break!!");
        if(myState===0 && breakPaused!==1 && breakSec>0){
            showBreakTime.innerHTML=`${Math.floor(breakSec/60)}:${breakSec%60}`;
            breakSec--;
        }
    }
});