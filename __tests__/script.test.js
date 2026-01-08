const { JSDOM } = require("jsdom");

const { createBlackoutToggle, createGradientUpdater } = require("../script");

const setupDom = () => {
    const dom = new JSDOM(
        `
        <!doctype html>
        <html>
            <body id="gradient">
                <input class="color1" type="color" value="#00ff00" />
                <input class="color2" type="color" value="#ff0000" />
                <button id="blackout-toggle" type="button"></button>
                <h3></h3>
            </body>
        </html>
        `,
        { runScripts: "outside-only" }
    );

    const body = dom.window.document.getElementById("gradient");
    const color1 = dom.window.document.querySelector(".color1");
    const color2 = dom.window.document.querySelector(".color2");
    const css = dom.window.document.querySelector("h3");
    const button = dom.window.document.getElementById("blackout-toggle");

    return { dom, body, color1, color2, css, button };
};

describe("createGradientUpdater", () => {
    it("updates the background and CSS text for the initial colors", () => {
        const { body, color1, color2, css } = setupDom();
        const setGradient = createGradientUpdater({ body, css, color1, color2 });

        setGradient();

        expect(body.style.background).toBe(
            "linear-gradient(to right, #00ff00, #ff0000)"
        );
        expect(css.textContent).toBe(
            "linear-gradient(to right, #00ff00, #ff0000);"
        );
    });

    it("updates the background after color input changes", () => {
        const { dom, body, color1, color2, css } = setupDom();
        const setGradient = createGradientUpdater({ body, css, color1, color2 });

        color1.value = "#123456";
        color2.value = "#654321";

        color1.addEventListener("input", setGradient);
        color2.addEventListener("input", setGradient);

        color1.dispatchEvent(new dom.window.Event("input"));

        expect(body.style.background).toBe(
            "linear-gradient(to right, #123456, #654321)"
        );
        expect(css.textContent).toBe(
            "linear-gradient(to right, #123456, #654321);"
        );
    });
});

describe("createBlackoutToggle", () => {
    it("toggles blackout styles and label text", () => {
        const { body, color1, color2, css, button } = setupDom();
        const setGradient = createGradientUpdater({ body, css, color1, color2 });
        const blackoutToggle = createBlackoutToggle({
            body,
            css,
            button,
            setGradient
        });

        expect(button.textContent).toBe("Mode noir");

        blackoutToggle.toggle();

        expect(body.classList.contains("blackout")).toBe(true);
        expect(body.style.background).toBe("#000");
        expect(css.textContent).toBe("background: #000;");
        expect(button.textContent).toBe("Retour gradient");

        blackoutToggle.toggle();

        expect(body.classList.contains("blackout")).toBe(false);
        expect(body.style.background).toBe(
            "linear-gradient(to right, #00ff00, #ff0000)"
        );
        expect(css.textContent).toBe(
            "linear-gradient(to right, #00ff00, #ff0000);"
        );
        expect(button.textContent).toBe("Mode noir");
    });
});
