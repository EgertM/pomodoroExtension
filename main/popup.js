var countDown;
var countDownBack;

var bkg = chrome.extension.getBackgroundPage();

window.onload = function () {
    var play = document.getElementById("play");
    var stop = document.getElementById("stop");
    var reset = document.getElementById("reset");

    /*var request = new XMLHttpRequest();
    request.open("GET", "https://www.toggl.com/api/v8/me", false);
    request.setRequestHeader("Authorization", 'Basic '+btoa("517b382e066c407af2a1bc603f16b611:api_token"));
    request.send();
    // view request status
    alert(request.status);*/
    //response.innerHTML = request.responseText;


    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");

    message = document.getElementById("message");

    state = "work";

    minutesLeft = document.getElementById("minutesLeft");


    play.addEventListener("click", function () {
        durationSeconds = parseInt(document.getElementById("duration").value) * 60;
        console.log(durationSeconds);
        countDownSecs = durationSeconds;
        breakTime = parseInt(document.getElementById("restTime").value) * 60;

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
        bkg.start(durationSeconds, breakTime, time_entry, "work", "Work in progress");
        minutesLeft.innerHTML = bkg.getCurrentTime().toString();
        message.innerHTML = bkg.getCurrentMessage();
    });
    stop.addEventListener("click", function () {
        minutesLeft = 0;
        message = "Nothing going on right now";
        bkg.stopTimer();
    });
    reset.addEventListener("click", function () {
        durationSeconds = savedCurrentDuration;
        breakTime = savedCurrentRest;
        bkg.resetTimer();
    });

    if (message !== null) {
        message.innerHTML = message;
    }
    minutesLeft.innerHTML = bkg.getCurrentTime().toString();
    message.innerHTML = bkg.getCurrentMessage();
};