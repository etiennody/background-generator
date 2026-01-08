// Load the full build.
var _ = require('lodash');

function createGradientUpdater(elements) {
    var body = elements.body;
    var css = elements.css;
    var color1 = elements.color1;
    var color2 = elements.color2;

    return function setGradient() {
        body.style.background =
            "linear-gradient(to right, "
            + color1.value
            + ", "
            + color2.value
            + ")";

        css.textContent = body.style.background + ";"
    }
}

function createBlackoutToggle(elements) {
    var body = elements.body;
    var css = elements.css;
    var button = elements.button;
    var setGradient = elements.setGradient;
    var isActive = false;

    function updateButton() {
        if (!button) {
            return;
        }
        button.textContent = isActive ? "Retour gradient" : "Mode noir";
    }

    function applyBlackout() {
        body.classList.add("blackout");
        body.style.background = "#000";
        css.textContent = "background: #000;";
    }

    function clearBlackout() {
        body.classList.remove("blackout");
        setGradient();
    }

    function toggleBlackout() {
        isActive = !isActive;
        if (isActive) {
            applyBlackout();
        } else {
            clearBlackout();
        }
        updateButton();
    }

    updateButton();

    return {
        toggle: toggleBlackout,
        isActive: function () {
            return isActive;
        }
    };
}

var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var blackoutButton = document.getElementById("blackout-toggle");

if (css && color1 && color2 && body) {
    var setGradient = createGradientUpdater({
        body: body,
        css: css,
        color1: color1,
        color2: color2
    });

    var blackoutToggle = createBlackoutToggle({
        body: body,
        css: css,
        button: blackoutButton,
        setGradient: setGradient
    });

    function handleGradientInput() {
        if (!blackoutToggle.isActive()) {
            setGradient();
        }
    }

    color1.addEventListener("input", handleGradientInput);
    color2.addEventListener("input", handleGradientInput);

    if (blackoutButton) {
        blackoutButton.addEventListener("click", blackoutToggle.toggle);
    }

    setGradient();
}

module.exports = {
    createGradientUpdater: createGradientUpdater,
    createBlackoutToggle: createBlackoutToggle
};
