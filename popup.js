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
    const resetAll = document.querySelector('.all-reset');
    var bodyContent = document.querySelector("body");
    const setTimings = document.querySelector(".set-work-break");
    const pauseWorkBtn = document.querySelector('.work-pause');
    const takeBreakBtn = document.querySelector('.take-break');

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
            doWork(workInput.value);
        });
    }

    function doWork(workDuration) {
        timerWindow.slideUp("slow");
        workWindow.show("slow");
        // buttons
        resetAll.addEventListener("click", resetWindow);
        pauseWorkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Pausing work");
        });
        takeBreakBtn.addEventListener("click", takeBreak);
        //////////////////////////////////////////
        console.log("Shifted to work mode for ", workDuration);
        console.log(bodyContent.style);
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://i.pinimg.com/564x/63/00/a7/6300a74eae90be4938bb39257e3fe6d9.jpg')";
    }

    function takeBreak(e) {
        e.preventDefault();
        // workWindow.hide("slow");
        // timerWindow.show("slow");
        console.log("Taking a break!!");
    }
});