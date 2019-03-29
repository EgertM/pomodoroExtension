var durationSeconds = 0;
var countDownSecs;

var breakTime;
var description; //goal


//work or rest
var message = "Nothing going on right now";

var biggerRest;
var howManyCycles = 1; //longer rest indicator
var cyclesMax; //how many work cycles we need to do for bigger rest

var state; //work or rest state

var minutesLeft;
var countDown;
var goalDisplay;

var currentId; // ID of time entry

var newTab; //new opened tab

var image; //image in opened tab
var imageCounter = 0; //for going through all the images

var picturesArray; // image array

var savedCurrentDuration; //to keep in mind when reseting
var savedCurrentRest; //to keep in mind when reseting


//overall counter logic for tracking time
function countTime() {

    //minutesLeft.innerHTML = durationSeconds;

    if (state === "work") {
        message = "Work in progress";
    }
    else {
        message = "Rest time";
    }

    if (durationSeconds === 0) {
        console.log("siin2");
        message = "";
        if (state === "work") {
            console.log(howManyCycles);
            console.log(cyclesMax);
            if (howManyCycles - cyclesMax === 0) {
                console.log("breaktime: " + breakTime);
                console.log("biggerRest: " + biggerRest);
                getPictures();
                howManyCycles = 1;
                console.log("pikem puhkus");
                durationSeconds = breakTime * biggerRest;
                state = "rest";
            }
            else {
                console.log("lühem puhkus");
                howManyCycles += 1;
                durationSeconds = breakTime;
                state = "rest";
                getPictures();
            }
        }
        else {
            state = "work";
            durationSeconds = savedCurrentDuration;
            minutesLeft = savedCurrentDuration;
        }
    }
    else {
        console.log(durationSeconds);
        durationSeconds = durationSeconds - 1;
    }
}
//start a pomodoro, parameters are sent from popup.js
function start(seconds, breakSecs, time, stateIn, messageIn, cycleMaxIn, restBigIn, descIn) {

    //console.log(request);
    description = descIn;
    biggerRest = restBigIn;
    cyclesMax = cycleMaxIn;
    durationSeconds = seconds;
    breakTime = breakSecs;
    state = stateIn;
    message = messageIn;

    console.log("max cycles:" + cyclesMax);

    savedCurrentDuration = seconds;
    savedCurrentRest = breakSecs;

    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", "https://www.toggl.com/api/v8/time_entries/start", false);
    postRequest.setRequestHeader("Authorization", 'Basic ' + btoa("517b382e066c407af2a1bc603f16b611:api_token"));
    postRequest.setRequestHeader("Content-Type", "application/json");
    postRequest.send(time);

    currentId = JSON.parse(postRequest.response);
    currentId = currentId["data"];
    currentId = currentId["id"];
    console.log(currentId);

    countDownSecs = durationSeconds;
    console.log(countDownSecs);
    countDown = setInterval(countTime, 1000);
    //window.open("display.html");
    console.log("siin all")
    //start.style.display = "none";
}
//finish a pomodoro
function stopTimer() {
    clearInterval(countDown);
    var putRequest = new XMLHttpRequest();
    var HTTPString = "https://www.toggl.com/api/v8/time_entries/" + currentId.toString() + "/stop";
    putRequest.open("PUT", HTTPString, false);
    putRequest.setRequestHeader("Authorization", 'Basic ' + btoa("517b382e066c407af2a1bc603f16b611:api_token"));
    putRequest.setRequestHeader("Content-Type", "application/json");
    putRequest.send();


    message = "Nothing going on right now";
    durationSeconds = 0;
    cyclesMax = 0;
    biggerRest = 0;

    description = "";
    breakTime = 0;
    //durationSeconds = 0;
    //start.style.display = "block";


}
//delete current pomodoro and reset all values
function deleteTimer() {
    clearInterval(countDown);
    var delRequest = new XMLHttpRequest();
    var HTTPString = "https://www.toggl.com/api/v8/time_entries/" + currentId.toString();
    delRequest.open("DELETE", HTTPString, false);
    delRequest.setRequestHeader("Authorization", 'Basic ' + btoa("517b382e066c407af2a1bc603f16b611:api_token"));
    delRequest.send();


    message = "Nothing going on right now";
    durationSeconds = 0;
    cyclesMax = 0;
    biggerRest = 0;

    description = "";
    breakTime = 0;
}

//returns leftover seconds of current action at hand
function getCurrentTime() {
    if (durationSeconds !== null) {
        return Math.ceil(durationSeconds / 60);
    }
    else {
        return 0;
    }
}
//returns current message
function getCurrentMessage() {
    if (message !== null) {
        return message.toString();
    }
    return "Nothing going on right now"
}

//opens a new tab to view dog pictures
function openTab() {
    newTab = chrome.windows.create({
        url: chrome.runtime.getURL("display.html")
    });
    console.log(picturesArray);

}
//fetches dog pictures from the API
function getPictures() {
    //https://dog.ceo/api/breeds/image/random/3 Fetch!
    var imageGetRequest = new XMLHttpRequest();
    imageGetRequest.open("GET", "https://dog.ceo/api/breeds/image/random/50", false);
    imageGetRequest.setRequestHeader("Content-Type", "application/json");
    imageGetRequest.send();

    picturesArray = JSON.parse(imageGetRequest.response)["message"];
    console.log(picturesArray);
    openTab();
}

function getPicsArray() {
    return picturesArray;
}

function getCyclesMax() {
    return cyclesMax;
}

function getBiggerRest() {
    return biggerRest;
}

function getDuration() {
    return durationSeconds;
}

function getDescription() {
    if (description !== null) {
        return description;
    }
    return "";
}

function getBreakTIme() {
    return breakTime;
}
