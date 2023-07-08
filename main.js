(() => {
    // common selectors
    var popup = document.getElementById("popup");

    const lockedColor = "#ccc";
    const unlockedColor = "#def";
    const selectedColor = "#33C3F0";

    const lockedOpacity = 0;
    const unlockedOpacity = 0.5;
    const selectedOpacity = 1;

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
            color: lockedColor,
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
            color: lockedColor,
            dashes: true,
            arrows: {
                to: {
                    scaleFactor: 0.5,
                },
            },
            // physics: false,
            // smooth: {
            //     type: "continuous",
            // },
        },
        groups: {
            SelfGrowth: { color: { background: "red", border: "red" } },
            DrivesResults: { color: { background: "pink", border: "pink" } },
            StrategicMindset: {
                color: { background: "black", border: "black" },
            },
            Alignment: { color: { background: "yellow", border: "yellow" } },
            Ambiguity: { color: { background: "orange", border: "orange" } },
            Interconnectivity: {
                color: { background: "blue", border: "blue" },
            },
            Communication: {
                color: { background: "purple", border: "purple" },
            },
            BalancesStakeholders: {
                color: { background: "gray", border: "gray" },
            },
            Adaptability: { color: { background: "green", border: "green" } },
        },
        layout: { randomSeed: 0 },
        // physics: {
        //     enabled: true,
        // },
        // layout: {
        //     hierarchical: {
        //         direction: "RL",
        //     },
        // },
    };
    let network = new vis.Network(container, data, options);
    // network.fit({
    //     nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    // });

    network.moveTo({
        position: { x: 0, y: 0 },
    });

    // network.focus("1");

    let wallet = 50;

    /* ********************************************************************************* */

    /**
    		update all graph nodes with selectedParents and subTree Requirements
    		change visuals based on status (values / requirements / selected)
    	**/
    const buildGraphDisplay = function () {
        //update wallet display
        document.getElementById("wallet").innerHTML = wallet;

        /* recursive subTree (classic) */
        /*
    		const getRSubtree = nodeId => {
    			let childs = network.getConnectedNodes(nodeId, "from");
    			if (childs.length > 0) {
    				let subtree = childs;
    				for (let i = 0; i < childs.length; i++) {
    					let nodeChilds = getSubtree(childs[i]);
    					if (nodeChilds) {
    						subtree = subtree.concat(nodeChilds);
    					}
    				}
    				return subtree;
    			}
    			return false;
    		};
    		*/

        /* SUBTREE */
        /* glitch subtree */
        const getSubtree = (nodeId) => {
            let childs = network.getConnectedNodes(nodeId, "from");
            for (let i = 0; i < childs.length; i++) {
                childs = childs.concat(
                    network.getConnectedNodes(childs[i], "from")
                );
            }
            return childs;
        };

        /* glitch parentTree */
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
            let currNode = nodes.get(nodeId);

            // updating nodes with subtree
            // example using reduce
            currNode.requiredSubtree = getSubtree(nodeId).reduce(
                (requiredNodes, id) => {
                    const childNode = nodes.get(id);
                    childNode.disabled !== true &&
                        childNode.selected !== true &&
                        typeof requiredNodes.find(
                            (o) => o.id === childNode.id
                        ) === "undefined" &&
                        requiredNodes.push(childNode);
                    return requiredNodes;
                },
                []
            );

            // updating nodes with parentspath
            // example with forEach
            let selectedParents = [];
            getParentstree(nodeId).forEach((node) => {
                const parentNode = nodes.get(node);
                parentNode.selected === true &&
                    typeof selectedParents.find(
                        (o) => o.id === parentNode.id
                    ) === "undefined" &&
                    selectedParents.push(parentNode);
            });
            currNode.selectedParents = selectedParents;

            // by default mark all as available
            currNode.locked = "";
            //trigger errors for unselected nodes
            if (currNode.selected !== true) {
                if (currNode.requiredSubtree.length > 0) {
                    // if missing nodes in path mark as locked
                    currNode.locked += "the skill is locked";
                }
            }

            // change node visuals
            var updateOpacity = lockedOpacity;
            if (currNode.selected === true || currNode.disabled == true) {
                updateOpacity = selectedOpacity;
            } else if (currNode.locked === "") {
                updateOpacity = unlockedOpacity;
            }
            currNode.opacity = updateOpacity;

            currNode.shapeProperties =
                currNode.locked === ""
                    ? { borderDashes: false }
                    : { borderDashes: [6, 4] };
            currNode.refund = Math.round(
                currNode.selectedParents.reduce(
                    (parentsRefund, node) => parentsRefund + node.value,
                    currNode.value
                ) * 0.9
            );

            // currNode.title =
            //     currNode.selected === true
            //         ? "deselect this skill"
            //         : currNode.locked === ""
            //         ? "select this skill"
            //         : currNode.locked.replace(/\n/g, "<br/>");

            currNode.borderWidth = currNode.selected == true ? 4 : 0;
            // currNode.borderWidthSelected = currNode.selected == true ? 2 : 1;

            nodes.update(currNode);

            const connectedEdges = network.getConnectedEdges(currNode.id);
            connectedEdges.forEach((id) => {
                const edge = edges.get(id);
                if (edge.to == currNode.id) {
                    edge.dashes = currNode.selected === true ? false : true;
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
    });

    /**
    		on click, update graph nodes selected status, handle wallet
    	**/
    network.on("click", (p) => {
        if (p.nodes.length) {
            let currNode = nodes.get(p.nodes[0]);
            if (currNode.disabled === true) {
                return;
            }

            if (currNode.locked == "") {
                if (currNode.selected == true) {
                    currNode.selectedParents.forEach((node) => {
                        node.selected = false;
                        nodes.update(node);
                    });
                    currNode.selected = false;
                    wallet += currNode.refund;
                } else {
                    currNode.selected = true;
                    wallet -= currNode.value;
                }
                nodes.update(currNode);
                document.getElementById("wallet").innerHTML = wallet;
            } else {
                // No need to alert, those are displayed in tooltips
                // alert(currNode.locked);
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
            populatePopup(curNode);
        }
    });

    // functionality for popup to hide on mouseout
    network.on("blurNode", function (p) {
        popup.style.opacity = "0";
    });

    function populatePopup(node) {
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
})();
