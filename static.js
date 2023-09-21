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

var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = staticTreeContainerSelector.offsetWidth;
canvas.height = staticTreeContainerSelector.offsetHeight;

var gkhead = new Image();
var ctx = canvas.getContext("2d");

function redraw() {
    // Clear the entire canvas
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(canvas.width, canvas.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    // var ctxCanvas = ctx.canvas;
    var hRatio = canvas.width / gkhead.width;
    var vRatio = canvas.height / gkhead.height;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvas.width - gkhead.width * ratio) / 2;
    var centerShift_y = (canvas.height - gkhead.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        gkhead,
        0,
        0,
        gkhead.width,
        gkhead.height,
        centerShift_x,
        centerShift_y,
        gkhead.width * ratio,
        gkhead.height * ratio
    );
}

function loadCanvas() {
    trackTransforms(ctx);
    redraw();

    var lastX = canvas.width / 2,
        lastY = canvas.height / 2;

    var dragStart, dragged;

    canvas.addEventListener(
        "mousedown",
        function (evt) {
            document.body.style.mozUserSelect =
                document.body.style.webkitUserSelect =
                document.body.style.userSelect =
                    "none";
            lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
            lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
            dragStart = ctx.transformedPoint(lastX, lastY);
            dragged = false;
        },
        false
    );

    canvas.addEventListener(
        "mousemove",
        function (evt) {
            lastX = evt.offsetX || evt.pageX - canvas.offsetLeft;
            lastY = evt.offsetY || evt.pageY - canvas.offsetTop;
            dragged = true;
            if (dragStart) {
                var pt = ctx.transformedPoint(lastX, lastY);
                ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
                redraw();
            }
        },
        false
    );

    canvas.addEventListener(
        "mouseup",
        function (evt) {
            dragStart = null;
            if (!dragged) zoom(evt.shiftKey ? -1 : 1);
        },
        false
    );

    var scaleFactor = 1.1;

    var zoom = function (clicks) {
        var pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        var factor = Math.pow(scaleFactor, clicks);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        redraw();
    };

    var handleScroll = function (evt) {
        var delta = evt.wheelDelta
            ? evt.wheelDelta / 40
            : evt.detail
            ? -evt.detail
            : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };

    canvas.addEventListener("DOMMouseScroll", handleScroll, false);
    canvas.addEventListener("mousewheel", handleScroll, false);
}

gkhead.src = "/images/static.jpg";

function trackTransforms(ctx) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function () {
        return xform;
    };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = function (radians) {
        xform = xform.rotate((radians * 180) / Math.PI);
        return rotate.call(ctx, radians);
    };

    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
    };
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

    loadCanvas();

    // hide loading screen
    setTimeout(function () {
        loadingScreenSelector.style.opacity = "0";
    }, 1000);
};

window.onresize = () => {
    canvas.width = staticTreeContainerSelector.offsetWidth;
    canvas.height = staticTreeContainerSelector.offsetHeight;

    redraw();
};
