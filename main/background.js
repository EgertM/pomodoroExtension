window.onload = function () {
    var play = document.getElementById("play");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");

    play.addEventListener("click", start, false);
    stop.addEventListener("click", stopTimer, false);
    reset.addEventListener("click", resetTimer, false);

    var durationSeconds = parseInt(document.getElementById("duration").value);
    console.log(durationSeconds);
    var countDownSecs = durationSeconds;
    var breakTime = parseInt(document.getElementById("restTime").value);

    var message = document.getElementById("message");

    var howManyCycles = 0;
    var state = "work";

    var minutesLeft = document.getElementById("minutesLeft");

    var countDown;

    function countTime() {
        
        minutesLeft.innerHTML = countDownSecs;

        if (state === "work") {
            message.innerHTML = "Work in progress";
        }
        else {
            message.innerHTML = "Rest time";
        }

        if (countDownSecs === 0) {
            console.log("siin2");
            message.innerHTML = "";
            if (state === "work") {
                if (howManyCycles === 4) {
                    howManyCycles = 0;
                    console.log("pikem puhkus");
                    countDownSecs = breakTime * 10;
                    state = "rest";
                }
                else {
                    console.log("lühem puhkus");

                    howManyCycles += 1;
                    countDownSecs = breakTime;
                    state = "rest";
                }
            }
            else {
                state = "work";
                countDownSecs = durationSeconds;
                minutesLeft = countDownSecs;
            }
        }
        else {
            console.log(countDownSecs);
            countDownSecs = countDownSecs - 1;
        }
    }

    function start() {
        durationSeconds = parseInt(document.getElementById("duration").value);
        breakTime = parseInt(document.getElementById("restTime").value);
        countDownSecs = durationSeconds;
        console.log(countDownSecs);
        countDown = setInterval(countTime, 1000);
        console.log("siin all")
        //start.style.display = "none";
    }

    function stopTimer() {
        clearInterval(countDown);
        countDownSecs = durationSeconds;
        //start.style.display = "block";
    }

    function resetTimer() {
        durationSeconds = parseInt(document.getElementById("duration").value);
        breakTime = parseInt(document.getElementById("restTime").value);
        countDownSecs = durationSeconds;
        minutesLeft.innerHTML = countDownSecs;
    }


};
