var durationSeconds = 0;
var countDownSecs;
var breakTime;
var time;
var description;
var time_entry;
var minutes;
var seconds;
var message = "Nothing going on right now";
var howManyCycles;
var state;
var minutesLeft;
var countDown;
var countDownBack;
var currentId;

var picturesArray;


var savedCurrentDuration;
var savedCurrentRest;

function countTime() {

    //minutesLeft.innerHTML = durationSeconds;

    minutes = Math.floor(durationSeconds / 60);
    seconds = durationSeconds - minutes * 60;

    //if minutes are less than 10, add 0 before, else add "", same for seconds
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

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
            if (howManyCycles === 4) {
                howManyCycles = 0;
                console.log("pikem puhkus");
                durationSeconds = breakTime * 10 * 60;
                state = "rest";
            }
            else {
                console.log("lühem puhkus");
                getPictures();
                howManyCycles += 1;
                durationSeconds = breakTime;
                state = "rest";
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

function start(seconds, breakSecs, time, stateIn, messageIn) {

    //console.log(request);

    durationSeconds = seconds;
    breakTime = breakSecs;
    state = stateIn;
    message = messageIn;

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

function stopTimer() {
    clearInterval(countDown);
    var putRequest = new XMLHttpRequest();
    var HTTPString = "https://www.toggl.com/api/v8/time_entries/" + currentId.toString() + "/stop";
    putRequest.open("PUT", HTTPString, false);
    putRequest.setRequestHeader("Authorization", 'Basic ' + btoa("517b382e066c407af2a1bc603f16b611:api_token"));
    putRequest.setRequestHeader("Content-Type", "application/json");
    putRequest.send();

    //durationSeconds = 0;
    //start.style.display = "block";


}

function resetTimer() {
    durationSeconds = savedCurrentDuration;
    breakTime = savedCurrentRest;
}

function getCurrentTime() {
    if (durationSeconds !== null) {
        return Math.ceil(durationSeconds / 60);
    }
    else {
        return 0;
    }
}

function getCurrentMessage() {
    if (message !== null) {
        return message.toString();
    }
    return "Nothing going on right now"
}
function getPictures(){
    //https://dog.ceo/api/breeds/image/random/3 Fetch!
    var imageGetRequest = new XMLHttpRequest();
    imageGetRequest.open("GET","https://dog.ceo/api/breeds/image/random/3");
    imageGetRequest.setRequestHeader("Content-Type", "application/json");
    imageGetRequest.send();

    picturesArray = imageGetRequest;
    console.log(picturesArray);
}