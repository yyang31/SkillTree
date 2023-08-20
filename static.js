// common selectors
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");
let loadingScreenSelector = document.getElementById("loadingScreen");
let categoryInputsSelector = document.getElementById("categoryInputs");

let hasLoadingError = false;

function auto_grow(element) {
    element.style.height = "45px";
    element.style.height = element.scrollHeight + "px";
}

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

window.onload = () => {
    // check for mobile device
    mobileAndTabletCheck();
    if (hasLoadingError) return;

    generateId(6);

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";

        // start the timer
        timer = true;
        toggleTimer();
    }, 1000);
};
