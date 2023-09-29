// common selectors
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");

function stopSkilltree() {
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
    }, 1000);
};
