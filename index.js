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

const zoomLimit = 0.5;

const defaultNumberOfSkillPoints = 5;

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
        DrivesResults: { color: drivesResultColor },
        StrategicMindset: { color: StrategicMindsetColor },
        Ambiguity: { color: ambiguityColor },
        Alignment: { color: alignmentColor },
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

// dom selectors
let skillPointSelector = document.getElementById("skillPoints");
let screenshotButtonSelector = document.getElementById("screenshotButton");
let stopButtonSelector = document.getElementById("stopButton");
let resetButtonSelector = document.getElementById("resetButton");
let loadingScreenSelector = document.getElementById("loadingScreen");

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

function resetSkilltree() {
    if (!stopSelection) {
        network.fit({
            nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        });

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

    screenShot();
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

    document.getElementById("userId").innerHTML += result;
}

function screenShot() {
    domtoimage
        .toPng(document.body)
        .then(function (dataUrl) {
            var a = document.getElementById("screenshotContainer");
            a.href = dataUrl;
            a.download = "skillTree.png";
            a.click();
        })
        .catch(function (error) {
            console.error("screenshot download failed", error);
        });
}

function recenter() {
    network.fit({
        nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
}

function mobileAndTabletCheck() {
    let check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    if (check) {
        hasLoadingError = true;
        document
            .getElementById("loadingScreen")
            .getElementsByClassName("loader")[0].style.display = "none";
        document.getElementById("loadingError").innerText =
            "please use a desktop or laptop to continue with the experiment";
    }

    return check;
}

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
