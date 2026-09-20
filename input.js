document.addEventListener("DOMContentLoaded", () => {
    const form = document.createElement("form");

    form.id = "answer-form";

    form.innerHTML = `
        <input
            id="answer-input"
            type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder="enter the next word"
            aria-label="Enter answer"
        >

        <button type="submit">ENTER</button>
    `;

    document.body.appendChild(form);


    const style = document.createElement("style");

    style.textContent = `
        #answer-form {
            position: fixed;
            left: 50%;
            bottom: 25px;
            transform: translateX(-50%);

            display: flex;
            gap: 8px;

            width: min(420px, calc(100% - 30px));

            z-index: 9999;
        }

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
        }

        #answer-input:focus {
            border-color: #555;
        }

        #answer-input::placeholder {
            color: #444;
        }

        #answer-form button {
            padding: 12px 16px;

            border: 1px solid #292929;
            background: #111;
            color: #777;

            cursor: pointer;

            font-family: monospace;
            font-size: 12px;
        }

        #answer-form button:hover {
            border-color: #555;
            color: #ddd;
        }
    `;

    document.head.appendChild(style);


    const input = document.getElementById("answer-input");


    form.addEventListener("submit", event => {
        event.preventDefault();

        const answer = input.value
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        if (!answer) {
            return;
        }

        window.location.href =
            "/impossible-website/" +
            encodeURIComponent(answer) +
            "/";
    });


    input.focus();
});