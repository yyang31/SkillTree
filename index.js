// common selectors
var popup = document.getElementById("popup");
let skillPointSelector = document.getElementById("skillPoints");
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");
let resetButtonSelector = document.getElementById("resetButton");
let loadingScreenSelector = document.getElementById("loadingScreen");

// important colors
const notBlack = "rgba(49, 54, 56, 1)";
const notWhite = "rgba(232, 233, 235, 1)";

// default color for each category
const outcomesDrivenColor = "rgba(177, 169, 201, 1)";
const StrategicMindsetColor = "rgba(160, 196, 157, 1)";
const alignmentColor = "rgba(252, 174, 174, 1)";
const ambiguityColor = "rgba(247, 208, 138, 1)";
const interconnectivityColor = "rgba(116, 132, 176, 1)";
const communicationColor = "rgba(0, 159, 147, 1)";
const balancesStakeholdersColor = "rgba(239, 100, 97, 1)";
const adaptabilityColor = "rgba(48, 107, 172, 1)";
const selfGrowthColor = "rgba(242, 140, 63, 1)";

const edgeColor = "rgba(49, 54, 56, 0.2)";

const lockedOpacity = 0;
const unlockedOpacity = 0.25;
const selectedOpacity = 1;

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2;

const defaultNumberOfSkillPoints = 50;

const container = document.getElementById("skilltree");
const data = {
    nodes: nodes,
    edges: edges,
};

const options = {
    interaction: {
        selectConnectedEdges: false,
        hover: true,
        zoomSpeed: 0.5,
    },
    nodes: {
        chosen: false,
        shape: "circularImage",
        scaling: { min: 20, max: 50 },
        font: {
            face: "Montserrat, Helvetica, Arial",
            size: 11,
            color: "#666",
        },
        fixed: true,
        borderWidth: 1,
        physics: false,
        opacity: lockedOpacity,
    },
    edges: {
        color: edgeColor,
        dashes: true,
        arrows: {
            to: {
                scaleFactor: 0.5,
            },
        },
        chosen: false,
    },
    groups: {
        OutcomesDriven: { color: outcomesDrivenColor },
        StrategicMindset: { color: StrategicMindsetColor },
        Alignment: { color: alignmentColor },
        Ambiguity: { color: ambiguityColor },
        Interconnectivity: { color: interconnectivityColor },
        Communication: { color: communicationColor },
        BalancesStakeholders: { color: balancesStakeholdersColor },
        Adaptability: { color: adaptabilityColor },
        SelfGrowth: { color: selfGrowthColor },
    },
    layout: { randomSeed: 0 },
};
let network = new vis.Network(container, data, options);

let stopSelection = false;
let hasLoadingError = false;

let mousePosition = {};

let skillPoints = defaultNumberOfSkillPoints;
var skillPointsUsage = {}; // total number of points assigned to each group
var maxPointsPerGroup = {}; // max number of points each groups have

/* ********************************************************************************* */

let buildVisited = new Set();
const buildGraphDisplay = function () {
    buildVisited.clear();

    nodes.getIds().forEach((nodeId) => {
        this.buildGraphDisplayHelper(nodeId);
    });
};

function updateGraphDisplay(nodeId) {
    this.buildGraphDisplayHelper(nodeId, true);
}

function buildGraphDisplayHelper(nodeId, isUpdate = false) {
    if (!isUpdate && buildVisited.has(nodeId)) {
        return;
    }

    let curNode = nodes.get(nodeId);

    curNode.locked = "";
    let parentsId = network.getConnectedNodes(nodeId, "from");
    parentsId.forEach((parentId) => {
        let parentNode = nodes.get(parentId);

        if (!parentNode.selected) {
            curNode.locked += "the skill is locked";
            curNode.selected = false;
        }
    });

    // change node visuals
    var updateOpacity = lockedOpacity;
    if (curNode.selected || curNode.isRoot) {
        updateOpacity = selectedOpacity;
    } else if (curNode.locked === "") {
        updateOpacity = unlockedOpacity;
    }
    curNode.opacity = updateOpacity;
    curNode.borderWidth = curNode.selected ? 4 : 0;

    curNode.shapeProperties =
        curNode.locked === ""
            ? { borderDashes: false }
            : { borderDashes: [6, 4] };

    let childsId = network.getConnectedNodes(nodeId, "to");
    childsId.forEach((childNodeId) => {
        buildGraphDisplayHelper(childNodeId, isUpdate);
    });

    buildVisited.add(nodeId);
    nodes.update(curNode);
}

let refundVisited = new Set();
function getRefund(nodeId) {
    refundVisited.clear();
    return getRefundHelper(nodeId);
}

function getRefundHelper(nodeId) {
    let curNode = nodes.get(nodeId);
    let refund = 1;

    let childsId = network.getConnectedNodes(nodeId, "to");
    childsId.forEach((childNodeId) => {
        if (refundVisited.has(childNodeId)) {
            return;
        }

        let childNode = nodes.get(childNodeId);
        if (childNode.selected) {
            refund += getRefundHelper(childNodeId);
        }
    });

    curNode.selected = false;
    nodes.update(curNode);

    refundVisited.add(nodeId);
    return refund;
}

/* EVENTS HANDLING */
/**
    init
**/
network.once("stabilized", () => {
    buildGraphDisplay();
    recenter();
});

/**
    limit zoom
**/
let lastZoomPosition = { x: 0, y: 0 };
network.on("zoom", function () {
    let scale = network.getScale();
    if (scale <= MIN_ZOOM) {
        network.moveTo({
            position: lastZoomPosition,
            scale: MIN_ZOOM,
        });
    } else if (scale >= MAX_ZOOM) {
        network.moveTo({
            position: lastZoomPosition,
            scale: MAX_ZOOM,
        });
    } else {
        lastZoomPosition = network.getViewPosition();
    }
});

network.on("dragEnd", function () {
    lastZoomPosition = network.getViewPosition();
});

/**
    on click, update graph nodes selected status, handle skillPoints
**/
network.on("click", (p) => {
    if (!stopSelection && p.nodes.length) {
        let curNode = nodes.get(p.nodes[0]);
        if (curNode.isRoot === true) {
            return;
        }

        if (curNode.locked == "") {
            if (curNode.selected == true) {
                let refund = getRefund(curNode.id);
                skillPoints += refund;

                var groupName = curNode.group;
                skillPointsUsage[curNode.group] -= refund;
            } else {
                if (skillPoints > 0) {
                    curNode.selected = true;
                    nodes.update(curNode);

                    skillPoints -= curNode.value;

                    var groupName = curNode.group;
                    skillPointsUsage[groupName] += 1;
                }
            }
            updateSkillPoints();

            updateAction();
            renderProgressBar();
            updateGraphDisplay(curNode.id);
        }
        popup.style.opacity = "0";
    }
});

// functionality for popup to show on mouseover
network.on("hoverNode", function (p) {
    if (p.node && p.node != 1) {
        network.canvas.body.container.style.cursor = "pointer";

        let nodeId = p.node;
        let curNode = nodes.get(nodeId);

        populatePopupForNode(curNode);
    }
});

network.on("blurNode", function () {
    network.canvas.body.container.style.cursor = "default";
});

// functionality for popup to hide on mouseout
network.on("blurNode", function (p) {
    popup.style.opacity = "0";
});

function populatePopupForNode(node) {
    if (node.isRoot === true) {
        return;
    }

    let position = network.canvasToDOM(
        network.getPositions([node.id])[node.id]
    );

    popup.querySelector("#popupNotice").innerText = node.locked;
    popup.querySelector("#popupTitle").innerText = node.label;
    popup.querySelector("#popupDescription").innerText = node.description;

    popup.style.top = position.y + "px";
    popup.style.bottom = "initial";
    popup.style.left = position.x - popup.offsetWidth / 2 + "px";
    popup.style.right = "initial";

    var popupPosition = popup.getBoundingClientRect();
    if (popupPosition.top + popupPosition.height > window.innerHeight) {
        // is off the bottom of the view
        popup.style.top = "initial";
        popup.style.bottom = window.innerHeight - position.y + "px";
    }
    if (popupPosition.right > window.innerWidth) {
        // is off to the right of the view
        popup.style.right = 0;
        popup.style.left = "initial";
    }
    if (popupPosition.left < 0) {
        // is off to the left of the view
        popup.style.left = 0;
    }
    if (popupPosition.top < 0) {
        // is off the top of the view
        popup.style.top = 0;
    }

    popup.style.opacity = "1";
    popup.style.visibility = "visible";
}

const pbElements = {
    OutcomesDriven: outcomesDrivenColor,
    StrategicMindset: StrategicMindsetColor,
    Ambiguity: ambiguityColor,
    Alignment: alignmentColor,
    Interconnectivity: interconnectivityColor,
    Communication: communicationColor,
    BalancesStakeholders: balancesStakeholdersColor,
    Adaptability: adaptabilityColor,
    SelfGrowth: selfGrowthColor,
};

const pbElementTitle = {
    OutcomesDriven: "Outcomes Driven",
    StrategicMindset: "Strategic Mindset",
    Alignment: "Alignment",
    Ambiguity: "Ambiguity",
    Interconnectivity: "Interconnectivity",
    Communication: "Communication",
    BalancesStakeholders: "Balances Stakeholders",
    Adaptability: "Adaptability",
    SelfGrowth: "Self-Growth",
};

function populateSkillPointsUsage() {
    network.groups._groupNames.forEach((groupName) => {
        skillPointsUsage[groupName] = 0;
    });
}

function populateMaxPointsPerGroup() {
    network.body.data.nodes._data.forEach((node) => {
        var groupName = node.group;

        if (groupName in maxPointsPerGroup) {
            maxPointsPerGroup[groupName] += 1;
        } else {
            maxPointsPerGroup[groupName] = 1;
        }
    });
}

function renderProgressBar() {
    const progressBarContainer = document.getElementById("progressBar");

    progressBarContainer.innerHTML = "";

    for (const [key, value] of Object.entries(pbElements)) {
        var newPBElement = document.createElement("div");
        newPBElement.classList.add("progress");
        newPBElement.style.backgroundColor = value;
        newPBElement.innerText = skillPointsUsage[key];

        var PRTooltip = document.createElement("div");
        PRTooltip.classList.add("tooltip");
        PRTooltip.innerText = pbElementTitle[key];

        if (skillPointsUsage[key] == maxPointsPerGroup[key]) {
            newPBElement.innerHTML =
                newPBElement.innerText +
                `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                    </svg>`;
        }

        newPBElement.appendChild(PRTooltip);
        progressBarContainer.appendChild(newPBElement);
    }
}

function updateSkillPoints() {
    skillPointSelector.innerHTML = "";

    var SPTooltip = document.createElement("div");
    SPTooltip.classList.add("tooltip");
    SPTooltip.innerText = `${skillPoints} out of ${defaultNumberOfSkillPoints} points have been used`;

    skillPointSelector.innerText = skillPoints;
    skillPointSelector.appendChild(SPTooltip);
}

function updateAction() {
    if (skillPoints == 0) {
        skillPointSelector.style.display = "none";
        stopButtonSelector.style.display = "flex";
    } else {
        skillPointSelector.style.display = "flex";
        stopButtonSelector.style.display = "none";
    }
}

function resetSkilltree() {
    if (!stopSelection) {
        recenter();

        nodes.getIds().forEach((nodeId) => {
            let curNode = nodes.get(nodeId);
            if (!curNode.isRoot) {
                curNode.selected = false;
            }
        });
        buildGraphDisplay();

        skillPoints = defaultNumberOfSkillPoints;
        updateSkillPoints();

        populateSkillPointsUsage();
        renderProgressBar();

        updateAction();
    }
}

function stopSkilltree() {
    stopSelection = true;

    stopButtonSelector.style.display = "none";
    resetButtonSelector.style.display = "none";
    screenshotButtonSelector.style.display = "flex";

    // stop the timer
    timer = false;
    toggleTimer();

    // fit the network graph
    network.fit();

    document.getElementById("nextButton").style.display = "block";

    // wait for the network to re-center
    setTimeout(function () {
        screenShot();
    }, 1000);
}

function recenter() {
    network.fit();
}

window.addEventListener("mousemove", (event) => {
    mousePosition = { x: event.clientX, y: event.clientY };
});

window.onload = () => {
    // check for mobile device
    mobileAndTabletCheck();
    if (hasLoadingError) return;

    updateSkillPoints();
    populateSkillPointsUsage();
    populateMaxPointsPerGroup();
    renderProgressBar();
    generateId(6);

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";

        // start the timer
        timer = true;
        toggleTimer();
    }, 1000);
};
