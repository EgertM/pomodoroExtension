var durationSeconds = 0;

var breakTime; //break time seconds
var description; //goal

var yourToken = "1971800d4d82861d8f2c1651fea4d212"+":api_token";//<--- replace the token part with your own

var wid;

//work or rest
var message = "Nothing going on right now";

var biggerRest;
var howManyCycles = 1; //longer rest indicator
var cyclesMax; //how many work cycles we need to do for bigger rest

var state; //work or rest state

var minutesLeft; //global var for remembering minutes left for popup.html
var countDown; //var for saving countTime() function
var goalDisplay; //goal display in popup

var currentId; // ID of time entry

var newTab; //new opened tab

var image; //image in opened tab
var imageCounter = 0; //for going through all the images

var picturesArray; // image array

var savedCurrentDuration; //to keep in mind when reseting
var savedCurrentRest; //to keep in mind when reseting


//overall counter logic for tracking time
function countTime() {


    if (state === "work") {
        message = "Work in progress";
    }
    else {
        message = "Rest time";
    }

    if (durationSeconds === 0) {
        message = "";
        if (state === "work") {
            console.log(howManyCycles);
            console.log(cyclesMax);
            if (howManyCycles - cyclesMax === 0) {
                console.log("breaktime: " + breakTime);
                console.log("biggerRest: " + biggerRest);
                getPictures();
                howManyCycles = 1;
                console.log("longer rest");
                durationSeconds = breakTime * biggerRest;
                state = "rest";
            }
            else {
                console.log("shorter rest");
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

    console.log("max cycles: " + cyclesMax);

    savedCurrentDuration = seconds;
    savedCurrentRest = breakSecs;

    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", "https://www.toggl.com/api/v8/time_entries/start", false);
    postRequest.setRequestHeader("Authorization", 'Basic ' + btoa(yourToken)); //<<<<---- replace token ID with your own from Toggl profile page
    postRequest.setRequestHeader("Content-Type", "application/json");
    postRequest.send(time);

    currentId = JSON.parse(postRequest.response);
    currentId = currentId["data"];
    currentId = currentId["id"];
    //console.log(currentId);

    countDown = setInterval(countTime, 1000);
}

//finish a pomodoro
function stopTimer() {
    clearInterval(countDown);
    var putRequest = new XMLHttpRequest();
    var HTTPString = "https://www.toggl.com/api/v8/time_entries/" + currentId.toString() + "/stop";
    putRequest.open("PUT", HTTPString, false);
    putRequest.setRequestHeader("Authorization", 'Basic ' + btoa(yourToken));//<<<<---- replace token ID with your own from Toggl profile page
    putRequest.setRequestHeader("Content-Type", "application/json");
    putRequest.send();


    message = "Nothing going on right now";
    durationSeconds = 0;
    cyclesMax = 0;
    biggerRest = 0;

    description = "";
    breakTime = 0;


}

//delete current pomodoro and reset all values
function deleteTimer() {
    clearInterval(countDown);
    var delRequest = new XMLHttpRequest();
    var HTTPString = "https://www.toggl.com/api/v8/time_entries/" + currentId.toString();
    delRequest.open("DELETE", HTTPString, false);
    delRequest.setRequestHeader("Authorization", 'Basic ' + btoa(yourToken));//<<<<---- replace token ID with your own from Toggl profile page
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
    //console.log(picturesArray);

}

//fetches dog pictures from the API
function getPictures() {
    //https://dog.ceo/api/breeds/image/random/3 Fetch!
    var imageGetRequest = new XMLHttpRequest();
    imageGetRequest.open("GET", "https://dog.ceo/api/breeds/image/random/50", false);
    imageGetRequest.setRequestHeader("Content-Type", "application/json");
    imageGetRequest.send();

    imageCounter = 0; //resetting image counter
    picturesArray = JSON.parse(imageGetRequest.response)["message"];
    //console.log(picturesArray);
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

function authenticate() {
    var getRequest = new XMLHttpRequest();
    getRequest.open("GET", "https://www.toggl.com/api/v8/me", false);
    getRequest.setRequestHeader("Authorization", 'Basic ' + btoa(yourToken));//<<<<---- replace token ID with your own from Toggl profile page
    getRequest.send();

    wid = JSON.parse(getRequest.response)["wid"];
}

function getWid() {
    return wid;
}
