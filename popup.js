$(function () {
    $('#home').click(function () {
        console.log("clicked")
        chrome.runtime.sendMessage({
            from: "popup",
            action: "goToHomePage"
        })
    });

    resetWindow();

    function resetWindow() {
        //  buttons        
        const timerForm = $(".set-time");
        const workWindow = $(".work-window");
        const breakWindow = $(".break-window");
        // by default , work and break windows are hidden
        workWindow.hide("fast");
        breakWindow.hide("fast");
        timerForm.show("slow");
        //  contents shown
        const myBtn = document.querySelector(".set-work-break");
        myBtn.addEventListener("click", (e) => {
            e.preventDefault();
            var workInput = document.querySelector(".work-time");
            var breakInput = document.querySelector(".break-time");
            // to ensure the input is not blank
            // if(!workInput.value || !breakInput.value){
            //     console.log("Please enter a value");
            //     return;
            // }
            doWork(workInput.value);
        });
    }

    function doWork(workDuration) {
        //  buttons        
        const timerForm = $(".set-time");
        const workWindow = $(".work-window");
        timerForm.slideUp("slow");
        workWindow.show("slow");
        // buttons
        const resetAll = document.querySelector('.all-reset');
        resetAll.addEventListener("click", resetWindow);
        const pauseWork = document.querySelector('.work-pause');
        pauseWork.addEventListener("click", (e)=>{
            e.preventDefault();
            console.log("Pausing work");
        });
        const takeBreak = document.querySelector('.take-break');
        takeBreak.addEventListener("click",(e)=>{
            e.preventDefault();
            console.log("Taking a break!!");
        });
        //////////////////////////////////////////
        console.log("Shifted to work mode for ", workDuration);
        var bodyContent = document.querySelector("body");
        console.log(bodyContent.style);
        bodyContent.style.backgroundImage = "linear-gradient(45deg, rgba(0,0,0,0.2), white), url('https://i.pinimg.com/564x/63/00/a7/6300a74eae90be4938bb39257e3fe6d9.jpg')";
    }
});