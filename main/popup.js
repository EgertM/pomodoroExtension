var bkg = chrome.extension.getBackgroundPage();

window.onload = function () {

    var play = document.getElementById("play");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");

    /*var cyclesMax = document.getElementById("cycles");
    var biggerRest = document.getElementById("restMultiply");
    var durationSeconds = document.getElementById("duration");
    var description = document.getElementById("goal");
    var breakTime = document.getElementById("restTime");*/

    message = document.getElementById("message");

    state = "work";

    minutesLeft = document.getElementById("minutesLeft");

    goalDisplay = document.getElementById("goalDisplay");


    play.addEventListener("click", function () {

        stop.style.visibility = 'visible';
        reset.style.visibility = 'visible';
        play.style.visibility = 'hidden';
        startReset()
    });
    stop.addEventListener("click", function () {

        stop.style.visibility = 'hidden';
        reset.style.visibility = 'hidden';
        play.style.visibility = 'visible';

        bkg.stopTimer();
    });
    reset.addEventListener("click", function () {
        bkg.deleteTimer();
        startReset();

    });

    if (message !== null) {
        message.innerHTML = message;
    }

    function refresh() {

        //on käimas mingi sündmus, töö või puhkus
        if (bkg.getDuration() > 0) {
            stop.style.visibility = 'visible';
            reset.style.visibility = 'visible';
            play.style.visibility = 'hidden';
        }
        else {
            stop.style.visibility = 'hidden';
            reset.style.visibility = 'hidden';
            play.style.visibility = 'visible';
        }
        minutesLeft.innerHTML = bkg.getCurrentTime().toString();
        message.innerHTML = bkg.getCurrentMessage();

        goalDisplay.innerHTML = bkg.getDescription();
        /*cyclesMax.innerHTML = bkg.getCyclesMax().toString();
        biggerRest.innerHTML = bkg.getBiggerRest().toString();

        durationSeconds.innerHTML = bkg.getDuration().toString();
        description.innerHTML = bkg.getDescription().toString();
        breakTime.innerHTML = bkg.getBreakTIme().toString();*/

        console.log("updaten")
    }

    function makeData() {
        durationSeconds = parseInt(document.getElementById("duration").value) * 60;
        console.log(durationSeconds);
        countDownSecs = durationSeconds;

        time = new Date().toISOString();
        time = time.substr(0, time.length - 5);
        //console.log(request);
        time = time + "+00:00";
        description = document.getElementById("goal").value;
        console.log(description);

        time_entry = {
            "time_entry": {
                "description": description,
                "created_with": "API example code",
                "start": time.toString(),
                "duration": durationSeconds,
                "wid": 3332235
            }
        };

        time_entry = JSON.stringify(time_entry);
        return time_entry
    }

    function startReset() {

        description = document.getElementById("goal").value;

        cyclesMax = document.getElementById("cycles").value;
        biggerRest = document.getElementById("restMultiply").value;

        breakTime = parseInt(document.getElementById("restTime").value) * 60;

        durationSeconds = parseInt(document.getElementById("duration").value) * 60;
        console.log(durationSeconds);
        countDownSecs = durationSeconds;


        bkg.start(durationSeconds, breakTime, makeData(), "work", "Work in progress", cyclesMax, biggerRest, description);
        minutesLeft.innerHTML = bkg.getCurrentTime().toString();
        message.innerHTML = bkg.getCurrentMessage();
    }

    setInterval(refresh, 100);
};