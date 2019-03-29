alert("Time for rest!");

var bkg = chrome.extension.getBackgroundPage();

window.onload = function () {
    image = document.getElementById("image");
    image.addEventListener("click", function () {
        displayImage();
    });
    console.log(image);

    image.src = bkg.getPicsArray()[imageCounter];
    imageCounter += 1;

    console.log("panen image");
    console.log(image);
};

function displayImage() {
    image.src = bkg.getPicsArray()[imageCounter];
    imageCounter += 1;
}
function refresh(){
    console.log(bkg.getCurrentMessage());
    if(bkg.getCurrentMessage()==="Work in progress"){
        alert("Time for work again!");
        window.close();
    }

}
setInterval(refresh,1000);

