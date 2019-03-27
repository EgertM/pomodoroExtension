window.onload = function() {
    var play = document.getElementById("play");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");

    play.addEventListener("click", start, false);
    stop.addEventListener("click", stopTimer, false);
    reset.addEventListener("click", resetTimer, false);

    var durationSeconds = parseInt(document.getElementById("duration").value) * 60;
    console.log(durationSeconds);
    var countDownSecs = durationSeconds;
    var breakTime = parseInt(document.getElementById("restTime").value) * 60;

    var message = document.getElementById("message");

    var howManyCycles = 0;
    var state = "work";

    var minutesLeft = document.getElementById("minutesLeft");

    var countDown;


    function countTime() {

        minutesLeft.innerHTML = countDownSecs / 60;

        if (state = "work") {
            message.innerHTML = "Work in progress";
        }
        else {
            message.innerHTML = "Rest time";
        }

        if (countDownSecs = 0) {
            message.innerHTML = "";
            if (state = "work") {
                if (howManyCycles = 4) {
                    howManyCycles = 0;
                    countDownSecs = breakTime + 60 * 10;
                    state = "rest";
                }
                else {
                    howManyCycles += 1;
                    countDownSecs = breakTime;
                    state = "rest";
                }
            }
            else {
                state = "work";
                countDownSecs = durationSeconds;
                minutesLeft = countDownSecs / 60;
            }
        }
        else {
            countDownSecs = countDownSecs - 1;
        }
    }

    function start() {
        countDown = setInterval(countTime(), 60 * 1000);
    }

    function stopTimer() {
        clearInterval(countDown);
    }

    function resetTimer() {
        countDownSecs = durationSeconds;
    }

};