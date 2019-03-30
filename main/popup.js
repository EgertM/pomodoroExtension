var bkg = chrome.extension.getBackgroundPage();

bkg.authenticate();
var wid = bkg.getWid(); //necessary parameter which can be retrieved by using GET HTTP request from JSON

window.onload = function () {

    var play = document.getElementById("play");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");

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

        //check if there is currently an action taking place, work or rest, if yes, then hide "play" button, otherwise hide "stop" and "reset" buttons
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

        //setting values to popup.html to have a basic overview of the current situation
        minutesLeft.innerHTML = bkg.getCurrentTime().toString();
        message.innerHTML = bkg.getCurrentMessage();

        goalDisplay.innerHTML = bkg.getDescription();

        console.log("updating")
    }

    //construct data that will be sent to Toggl API
    function makeData() {

        durationSeconds = parseInt(document.getElementById("duration").value) * 60;

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
                "wid": wid
            }
        };

        time_entry = JSON.stringify(time_entry);
        return time_entry
    }

    //starting a task action, reset also uses same method for starting an action again
    function startReset() {

        description = document.getElementById("goal").value;

        cyclesMax = document.getElementById("cycles").value;
        biggerRest = document.getElementById("restMultiply").value;

        breakTime = parseInt(document.getElementById("restTime").value) * 60;

        durationSeconds = parseInt(document.getElementById("duration").value) * 60;


        bkg.start(durationSeconds, breakTime, makeData(), "work", "Work in progress", cyclesMax, biggerRest, description);

        //also update minutesLeft and message on popup.html
        minutesLeft.innerHTML = bkg.getCurrentTime().toString();
        message.innerHTML = bkg.getCurrentMessage();
    }

    //calling out refresh on popup.html so that the values there are always updated
    setInterval(refresh, 100);
};