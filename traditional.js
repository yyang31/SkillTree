// common selectors
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");
let menuBarContainerSelector = document.getElementById("menuBarContainer");
let traditionalSkillTreeContainerSelector = document.getElementById(
    "traditionalSkillTreeContainer"
);
let skillTextAreaSelector = document.getElementById("skillTextArea");

function stopSkilltree() {
    stopButtonSelector.style.display = "none";
    screenshotButtonSelector.style.display = "flex";

    // stop the timer
    timer = false;
    toggleTimer();

    skillTextAreaSelector.disabled = true;

    document.getElementById("nextButton").style.display = "block";

    // wait for the network to re-center
    setTimeout(function () {
        screenShot();
    }, 1000);
}

function auto_grow() {
    skillTextAreaSelector.style.height = "45px";
    skillTextAreaSelector.style.height =
        skillTextAreaSelector.scrollHeight + "px";

    traditionalSkillTreeContainerSelector.style.paddingTop =
        skillTextAreaSelector.getBoundingClientRect().bottom + "px";
}

window.onload = () => {
    // check for mobile device
    mobileAndTabletCheck();
    if (hasLoadingError) return;

    generateId(6);

    // auto_grow();

    traditionalSkillTreeContainerSelector.style.paddingTop =
        skillTextAreaSelector.getBoundingClientRect().bottom + "px";

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";
    }, 1000);
};
