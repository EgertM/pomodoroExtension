alert("Time for rest!");

var bkg = chrome.extension.getBackgroundPage();

window.onload = function () {
    //on load setting first image on the page
    image = document.getElementById("image");
    image.addEventListener("click", function () {
        displayImage();
    });

    image.src = bkg.getPicsArray()[imageCounter];
    imageCounter += 1;

};

//set the image source
function displayImage() {
    image.src = bkg.getPicsArray()[imageCounter];
    imageCounter += 1;
}

//check if window needs to be closed after every second, so when the time for working starts, page will be gone
function refresh() {
    console.log(bkg.getCurrentMessage());
    if (bkg.getCurrentMessage() === "Work in progress") {
        alert("Time for work again!");
        window.close();
    }

}

setInterval(refresh, 1000);

