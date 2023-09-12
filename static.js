// common selectors
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");
let loadingScreenSelector = document.getElementById("loadingScreen");
let categoryInputsSelector = document.getElementById("categoryInputs");
let staticTreeContainerSelector = document.getElementById(
    "staticTreeContainer"
);
let staticTreeContainerImageSelector = document.querySelector(
    "#staticTreeContainer img"
);

let hasLoadingError = false;

function disableCategoryInputs() {
    textareas = categoryInputsSelector.getElementsByTagName("textarea");

    for (let textarea of textareas) {
        textarea.disabled = true;
    }
}

function stopSkilltree() {
    disableCategoryInputs();

    stopButtonSelector.style.display = "none";
    screenshotButtonSelector.style.display = "flex";

    // stop the timer
    timer = false;
    toggleTimer();

    document.getElementById("nextButton").style.display = "block";

    // wait for the network to re-center
    setTimeout(function () {
        screenShot();
    }, 1000);
}

let currentZoom = 1;
let minZoom = 1;
let maxZoom = 5;
let stepSize = 0.1;
staticTreeContainerSelector.addEventListener("wheel", function (event) {
    // Zoom in or out based on the scroll direction
    let direction = event.deltaY > 0 ? -1 : 1;
    zoomImage(direction);
});

function zoomImage(direction) {
    let newZoom = currentZoom + direction * stepSize;

    // Limit the zoom level to the minimum and maximum values
    if (newZoom < minZoom || newZoom > maxZoom) {
        return;
    }

    currentZoom = newZoom;

    // Update the CSS transform of the image to scale it
    staticTreeContainerImageSelector.style.transform =
        "scale(" + currentZoom + ")";
}

window.onload = () => {
    // check for mobile device
    mobileAndTabletCheck();
    if (hasLoadingError) return;

    generateId(6);

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";
        staticTreeContainerSelector.style.display = "flex";

        // start the timer
        timer = true;
        toggleTimer();
    }, 1000);
};
