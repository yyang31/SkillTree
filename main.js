// common selectors
var popup = document.getElementById("popup");

// important colors
const notBlack = "rgba(49, 54, 56, 1)";
const notWhite = "rgba(232, 233, 235, 1)";

// default color for each category
const drivesResultColor = "rgba(177, 169, 201, 1)";
const StrategicMindsetColor = "rgba(160, 196, 157, 1)";
const ambiguityColor = "rgba(252, 174, 174, 1)";
const alignmentColor = "rgba(247, 208, 138, 1)";
const interconnectivityColor = "rgba(116, 132, 176, 1)";
const communicationColor = "rgba(0, 159, 147, 1)";
const balancesStakeholdersColor = "rgba(239, 100, 97, 1)";
const adaptabilityColor = "rgba(48, 107, 172, 1)";
const selfGrowthColor = "rgba(242, 140, 63, 1)";

const edgeColor = "rgba(49, 54, 56, 0.5)";

const lockedOpacity = 0;
const unlockedOpacity = 0.25;
const selectedOpacity = 1;

const defaultNumberOfSkillPoints = 3;

const container = document.getElementById("skilltree");
const data = {
    nodes: nodes,
    edges: edges,
};

const options = {
    interaction: {
        selectConnectedEdges: false,
        hover: true,
    },
    nodes: {
        chosen: false,
        shape: "circularImage",
        scaling: { min: 20, max: 50 },
        font: {
            face: "Raleway, Helvetica, Arial",
            size: 11,
            color: "#666",
        },
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
    },
    groups: {
        SelfGrowth: { color: selfGrowthColor },
        DrivesResults: { color: drivesResultColor },
        StrategicMindset: { color: StrategicMindsetColor },
        Alignment: { color: alignmentColor },
        Ambiguity: { color: ambiguityColor },
        Interconnectivity: { color: interconnectivityColor },
        Communication: { color: communicationColor },
        BalancesStakeholders: { color: balancesStakeholdersColor },
        Adaptability: { color: adaptabilityColor },
    },
    layout: { randomSeed: 0 },
};
let network = new vis.Network(container, data, options);

let stopSelection = false;

// dom selectors
let skillPointSelector = document.getElementById("skillPoints");
let stopButtonSelector = document.getElementById("stopButton");
let resetButtonSelector = document.getElementById("resetButton");
let loadingScreenSelector = document.getElementById("loadingScreen");

let skillPoints = defaultNumberOfSkillPoints;
var skillPointsUsage = {
    DrivesResults: 0,
    StrategicMindset: 0,
    Alignment: 0,
    Ambiguity: 0,
    Interconnectivity: 0,
    Communication: 0,
    BalancesStakeholders: 0,
    Adaptability: 0,
    SelfGrowth: 0,
};

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

    network.fit({
        nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
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
                skillPointsUsage[curNode.group] -= 1;
            } else {
                if (skillPoints > 0) {
                    curNode.selected = true;
                    skillPoints -= curNode.value;
                    skillPointsUsage[curNode.group] += 1;
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
    if (p.node) {
        let nodeId = p.node;
        let curNode = nodes.get(nodeId);
        populatePopupForNode(curNode);
    }
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
    DrivesResults: drivesResultColor,
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
    DrivesResults: "Drives Results",
    StrategicMindset: "Strategic Mindset",
    Alignment: "Alignment",
    Ambiguity: "Ambiguity",
    Interconnectivity: "Interconnectivity",
    Communication: "Communication",
    BalancesStakeholders: "Balances Stakeholders",
    Adaptability: "Adaptability",
    SelfGrowth: "Self-Growth",
};

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

        newPBElement.appendChild(PRTooltip);
        progressBarConatiner.appendChild(newPBElement);
    }
}

let timer = false;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

function toggleTimer() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour < 10 ? "0" + hour : hour;
        let minString = minute < 10 ? "0" + minute : minute;
        let secString = second < 10 ? "0" + second : second;
        let timerString = `${hrString}:${minString}:${secString}`;

        document.getElementById("timer").innerText = timerString;

        setTimeout(toggleTimer, 10);
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

function restSkilltree() {
    if (!stopSelection) {
        nodes.getIds().forEach((nodeId) => {
            let curNode = nodes.get(nodeId);
            curNode.selected = false;
        });
        buildGraphDisplay();

        skillPoints = defaultNumberOfSkillPoints;
        updateSkillPoints();

        Object.keys(skillPointsUsage).forEach(function (key) {
            skillPointsUsage[key] = 0;
        });
        renderProfressBar();

        updateAction();
    }
}

function stopSkilltree() {
    stopSelection = true;

    stopButtonSelector.classList.add("disabled");
    resetButtonSelector.classList.add("disabled");

    // stop the timer
    timer = false;
    toggleTimer();

    // fit the network graph
    network.fit();

    document.getElementById("nextContainer").style.display = "block";
}

function generateId(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }

    document.getElementById("userId").innerText = result;
}

window.onload = () => {
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
