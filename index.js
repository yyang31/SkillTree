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

const zoomLimit = 0.25;

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

/**
    update all graph nodes with selectedParents and subTree Requirements
    change visuals based on status (values / requirements / selected)
**/
const buildGraphDisplay = function () {
    //update skillPoints display
    updateSkillPoints();

    /* SUBTREE */
    /* subtree */
    const getSubtree = (nodeId) => {
        let childs = network.getConnectedNodes(nodeId, "from");
        for (let i = 0; i < childs.length; i++) {
            childs = childs.concat(
                network.getConnectedNodes(childs[i], "from")
            );
        }
        return childs;
    };

    /* parentTree */
    const getParentstree = (nodeId) => {
        let parents = network.getConnectedNodes(nodeId, "to");
        for (let i = 0; i < parents.length; i++) {
            parents = parents.concat(
                network.getConnectedNodes(parents[i], "to")
            );
        }
        return parents;
    };

    nodes.getIds().forEach((nodeId) => {
        let curNode = nodes.get(nodeId);

        // updating nodes with subtree
        curNode.requiredSubtree = getSubtree(nodeId).reduce(
            (requiredNodes, id) => {
                const childNode = nodes.get(id);
                childNode.disabled !== true &&
                    childNode.selected !== true &&
                    typeof requiredNodes.find((o) => o.id === childNode.id) ===
                        "undefined" &&
                    requiredNodes.push(childNode);
                return requiredNodes;
            },
            []
        );

        // updating nodes with parentspath
        let selectedParents = [];
        getParentstree(nodeId).forEach((node) => {
            const parentNode = nodes.get(node);
            parentNode.selected === true &&
                typeof selectedParents.find((o) => o.id === parentNode.id) ===
                    "undefined" &&
                selectedParents.push(parentNode);
        });
        curNode.selectedParents = selectedParents;

        // by default mark all as available
        curNode.locked = "";
        //trigger errors for unselected nodes
        if (curNode.selected !== true) {
            if (curNode.requiredSubtree.length > 0) {
                // if missing nodes in path mark as locked
                curNode.locked += "the skill is locked";
            }
        }

        // change node visuals
        var updateOpacity = lockedOpacity;
        if (curNode.selected === true || curNode.disabled == true) {
            updateOpacity = selectedOpacity;
        } else if (curNode.locked === "") {
            updateOpacity = unlockedOpacity;
        }
        curNode.opacity = updateOpacity;

        curNode.shapeProperties =
            curNode.locked === ""
                ? { borderDashes: false }
                : { borderDashes: [6, 4] };
        curNode.refund = Math.round(
            curNode.selectedParents.reduce(
                (parentsRefund, node) => parentsRefund + node.value,
                curNode.value
            ) * 0.9
        );

        curNode.borderWidth = curNode.selected == true ? 4 : 0;

        nodes.update(curNode);

        const connectedEdges = network.getConnectedEdges(curNode.id);
        connectedEdges.forEach((id) => {
            const edge = edges.get(id);
            if (edge.to == curNode.id) {
                edge.dashes = curNode.selected === true ? false : true;
                edges.update(edge);
            }
        });
    });
};

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
network.on("zoom", function () {
    if (network.getScale() <= zoomLimit) {
        network.moveTo({
            scale: zoomLimit,
            position: network.DOMtoCanvas(mousePosition),
        });
    }
});

/**
    on click, update graph nodes selected status, handle skillPoints
**/
network.on("click", (p) => {
    if (!stopSelection && p.nodes.length) {
        let curNode = nodes.get(p.nodes[0]);
        if (curNode.disabled === true) {
            return;
        }

        if (curNode.locked == "") {
            if (curNode.selected == true) {
                curNode.selectedParents.forEach((node) => {
                    node.selected = false;
                    nodes.update(node);
                });
                curNode.selected = false;
                skillPoints += curNode.refund;

                var groupName = curNode.group;
                skillPointsUsage[curNode.group] -= 1;
            } else {
                if (skillPoints > 0) {
                    curNode.selected = true;
                    skillPoints -= curNode.value;

                    var groupName = curNode.group;
                    skillPointsUsage[groupName] += 1;
                }
            }
            nodes.update(curNode);
            updateSkillPoints();

            updateAction();
            renderProfressBar();
        }
        buildGraphDisplay();
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
    if (node.disabled === true) {
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

function renderProfressBar() {
    const progressBarConatiner = document.getElementById("progressBar");

    progressBarConatiner.innerHTML = "";

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
        progressBarConatiner.appendChild(newPBElement);
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
            curNode.selected = false;
        });
        buildGraphDisplay();

        skillPoints = defaultNumberOfSkillPoints;
        updateSkillPoints();

        populateSkillPointsUsage();
        renderProfressBar();

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

    populateSkillPointsUsage();
    populateMaxPointsPerGroup();
    renderProfressBar();
    generateId(6);

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";

        // start the timer
        timer = true;
        toggleTimer();
    }, 1000);
};
