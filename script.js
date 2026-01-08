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

var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");

if (css && color1 && color2 && body) {
    var setGradient = createGradientUpdater({
        body: body,
        css: css,
        color1: color1,
        color2: color2
    });

    color1.addEventListener("input", setGradient);
    color2.addEventListener("input", setGradient);
    setGradient();
}

module.exports = {
    createGradientUpdater: createGradientUpdater
};
