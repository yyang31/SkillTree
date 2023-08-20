// instruction Panel
let instructionPanelSelector = document.getElementById("instructionPanel");
let instructionToggleButtonSelector = document.getElementById(
    "instructionToggleButton"
);

function toggleInstructionPanel(action = "open") {
    if (action == "open") {
        instructionPanelSelector.classList.remove("hide");
        instructionToggleButtonSelector.lastChild.innerText = "Close";
    } else {
        instructionPanelSelector.classList.add("hide");
        instructionToggleButtonSelector.lastChild.innerText = "Help";
    }
}

instructionToggleButtonSelector.addEventListener("click", () => {
    if (instructionPanelSelector.classList.contains("hide")) {
        toggleInstructionPanel("open");
    } else {
        toggleInstructionPanel("close");
    }
});
