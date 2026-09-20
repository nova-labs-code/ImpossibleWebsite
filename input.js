document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       PREVENT ZOOM
       ================================================== */

    let viewport = document.querySelector('meta[name="viewport"]');

    if (!viewport) {
        viewport = document.createElement("meta");
        viewport.name = "viewport";
        document.head.appendChild(viewport);
    }

    viewport.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";


    // Prevent pinch-to-zoom
    document.addEventListener(
        "touchmove",
        event => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        },
        { passive: false }
    );


    // Prevent double-tap zoom
    let lastTouchEnd = 0;

    document.addEventListener(
        "touchend",
        event => {
            const now = Date.now();

            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }

            lastTouchEnd = now;
        },
        { passive: false }
    );


    // Prevent Ctrl/Cmd + mouse-wheel zoom
    document.addEventListener(
        "wheel",
        event => {
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
            }
        },
        { passive: false }
    );


    // Prevent Ctrl/Cmd keyboard zoom
    document.addEventListener("keydown", event => {

        if (event.ctrlKey || event.metaKey) {

            if (
                event.key === "+" ||
                event.key === "=" ||
                event.key === "-" ||
                event.key === "_" ||
                event.key === "0"
            ) {
                event.preventDefault();
            }

        }

    });


    /* ==================================================
       INPUT AREA
       ================================================== */

    const inputArea = document.createElement("div");

    inputArea.id = "answer-area";

    inputArea.innerHTML = `
        <form id="answer-form">

            <input
                id="answer-input"
                type="text"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="none"
                spellcheck="false"
                placeholder="enter the next word"
                aria-label="Enter answer"
            >

            <button type="submit">
                ENTER
            </button>

        </form>
    `;


    /*
     * Add the input as the LAST element
     * inside the body.
     *
     * It is NOT fixed.
     * It is NOT an overlay.
     */
    document.body.appendChild(inputArea);


    /* ==================================================
       STYLING
       ================================================== */

    const style = document.createElement("style");

    style.textContent = `

        /*
         * Make the entire page a vertical layout.
         */

        html,
        body {
            margin: 0;
            min-height: 100%;
        }

        body {
            min-height: 100vh;

            display: flex;
            flex-direction: column;
        }


        /*
         * The input is a normal part of the page.
         * margin-top: auto pushes it toward the bottom
         * when the page does not have much content.
         */

        #answer-area {
            width: 100%;

            margin-top: auto;

            padding: 30px 20px 40px;

            display: flex;
            justify-content: center;

            box-sizing: border-box;
        }


        /*
         * Input + button
         */

        #answer-form {
            display: flex;

            gap: 8px;

            width: min(420px, 100%);
        }


        /*
         * Text input
         */

        #answer-input {
            flex: 1;

            min-width: 0;

            padding: 12px 14px;

            border: 1px solid #292929;
            outline: none;

            background: #0b0b0b;
            color: #ddd;

            font-family: monospace;
            font-size: 13px;

            border-radius: 0;

            box-sizing: border-box;
        }


        #answer-input:focus {
            border-color: #555;
        }


        #answer-input::placeholder {
            color: #444;
        }


        /*
         * Enter button
         */

        #answer-form button {
            padding: 12px 16px;

            border: 1px solid #292929;

            background: #111;
            color: #777;

            cursor: pointer;

            font-family: monospace;
            font-size: 12px;

            border-radius: 0;

            transition:
                border-color 0.2s ease,
                color 0.2s ease,
                background 0.2s ease;
        }


        #answer-form button:hover {
            border-color: #555;

            background: #151515;

            color: #ddd;
        }


        #answer-form button:active {
            background: #1a1a1a;
        }


        /*
         * Mobile
         */

        @media (max-width: 500px) {

            #answer-area {
                padding: 25px 15px 30px;
            }

            #answer-form {
                width: 100%;
            }

        }

    `;

    document.head.appendChild(style);


    /* ==================================================
       NAVIGATION
       ================================================== */

    const form = document.getElementById("answer-form");
    const input = document.getElementById("answer-input");


    form.addEventListener("submit", event => {

        event.preventDefault();


        /*
         * Convert the player's answer into a URL keyword.
         *
         * Example:
         *
         * " Mirror "
         *      ↓
         * "mirror"
         *
         * "hello world"
         *      ↓
         * "hello-world"
         */

        const answer = input.value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");


        // Do nothing if the input is empty.

        if (!answer) {
            return;
        }


        /*
         * Go directly to the keyword URL.
         *
         * Correct or incorrect does not matter here.
         *
         * If the page exists:
         *     /ImpossibleWebsite/mirror/
         *
         * If it doesn't:
         *     GitHub Pages loads 404.html
         */

        window.location.href =
            "/ImpossibleWebsite/" +
            encodeURIComponent(answer) +
            "/";
    });


    /* ==================================================
       FOCUS INPUT
       ================================================== */

    input.focus();

});