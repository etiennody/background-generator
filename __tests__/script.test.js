const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

const { createGradientUpdater } = require("../script");

const buildElements = () => {
    const body = { style: { background: "" } };
    const css = { textContent: "" };
    const color1 = { value: "#00ff00" };
    const color2 = { value: "#ff0000" };

    return { body, css, color1, color2 };
};

test("index.html includes labels and matching ids for color inputs", () => {
    const htmlPath = path.join(__dirname, "..", "index.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    assert.match(
        html,
        /<label[^>]*for="color1"[^>]*>Start color<\/label>/i
    );
    assert.match(html, /<input[^>]*id="color1"[^>]*>/i);
    assert.match(html, /<input[^>]*class="color1"[^>]*>/i);
    assert.match(
        html,
        /<label[^>]*for="color2"[^>]*>End color<\/label>/i
    );
    assert.match(html, /<input[^>]*id="color2"[^>]*>/i);
    assert.match(html, /<input[^>]*class="color2"[^>]*>/i);
});

test("createGradientUpdater updates the background and CSS text for the initial colors", () => {
    const { body, color1, color2, css } = buildElements();
    const setGradient = createGradientUpdater({ body, css, color1, color2 });

    setGradient();

    assert.equal(
        body.style.background,
        "linear-gradient(to right, #00ff00, #ff0000)"
    );
    assert.equal(
        css.textContent,
        "linear-gradient(to right, #00ff00, #ff0000);"
    );
});

test("createGradientUpdater updates the background after color input changes", () => {
    const { body, color1, color2, css } = buildElements();
    const setGradient = createGradientUpdater({ body, css, color1, color2 });

    color1.value = "#123456";
    color2.value = "#654321";

    setGradient();

    assert.equal(
        body.style.background,
        "linear-gradient(to right, #123456, #654321)"
    );
    assert.equal(
        css.textContent,
        "linear-gradient(to right, #123456, #654321);"
    );
});
