// common selectors
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");
let resetButtonSelector = document.getElementById("resetButton");
let loadingScreenSelector = document.getElementById("loadingScreen");
let categoryInputsSelector = document.getElementById("categoryInputs");
let skillPointSelector = document.getElementById("skillPoints");
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

let skillPoints = 0;
let defaultNumberOfSkillPoints = 50;
function updateSkillPoints() {
    skillPointSelector.innerHTML = "";

    var SPTooltip = document.createElement("div");
    SPTooltip.classList.add("tooltip");
    SPTooltip.innerText = `${skillPoints} out of ${defaultNumberOfSkillPoints} points have been used`;

    skillPointSelector.innerText = skillPoints;
    skillPointSelector.appendChild(SPTooltip);
}

function inputValueChange(e) {
    let target = e.target;

    if (target.value < 0) {
        alert("Value must be greater than or equal to 0.");
        target.value = 0;
    }

    if (
        Number(target.value) + Number(skillPoints) >
        defaultNumberOfSkillPoints
    ) {
        alert(
            `Exceeded max number of skill point of ${defaultNumberOfSkillPoints}.`
        );
        target.value = 0;
    }

    skillPoints = 0;
    Array.from(categoryInputsSelector.getElementsByTagName("input")).forEach(
        (input) => {
            skillPoints += Number(input.value);
        }
    );

    updateSkillPoints();

    if (skillPoints == defaultNumberOfSkillPoints) {
        stopButtonSelector.style.display = "block";
    }
}

function prepareInputs() {
    Array.from(categoryInputsSelector.getElementsByTagName("input")).forEach(
        (input) => {
            input.addEventListener("change", inputValueChange);
            input.addEventListener("propertychange", inputValueChange);
        }
    );
}

function stopSkilltree() {
    disableCategoryInputs();

    resetButtonSelector.style.display = "none";

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

function resetSkilltree() {
    skillPoints = 0;
    Array.from(categoryInputsSelector.getElementsByTagName("input")).forEach(
        (input) => {
            input.value = 0;
        }
    );

    stopButtonSelector.style.display = "none";

    updateSkillPoints();
}

window.onload = () => {
    // check for mobile device
    mobileAndTabletCheck();
    if (hasLoadingError) return;

    generateId(6);

    prepareInputs();

    updateSkillPoints();

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";
        staticTreeContainerSelector.style.display = "flex";

        // start the timer
        timer = true;
        toggleTimer();
    }, 1000);
};
