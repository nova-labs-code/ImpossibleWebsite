document.addEventListener("DOMContentLoaded", () => {

    const inputArea = document.createElement("div");

    inputArea.id = "answer-area";

    inputArea.innerHTML = `
        <form id="answer-form">
            <input
                id="answer-input"
                type="text"
                autocomplete="off"
                spellcheck="false"
                placeholder="enter the next word"
                aria-label="Enter answer"
            >

            <button type="submit">ENTER</button>
        </form>
    `;

    document.body.appendChild(inputArea);


    const style = document.createElement("style");

    style.textContent = `
        #answer-area {
            width: 100%;
            padding: 30px 20px 40px;

            display: flex;
            justify-content: center;

            box-sizing: border-box;
        }

        #answer-form {
            display: flex;
            gap: 8px;

            width: min(420px, 100%);
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
            "/ImpossibleWebsite/" +
            encodeURIComponent(answer) +
            "/";
    });


    input.focus();

});