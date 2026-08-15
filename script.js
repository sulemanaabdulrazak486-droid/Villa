const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const characterCount = document.getElementById("characterCount");
const clearButton = document.getElementById("clearButton");
const humanizeButton = document.getElementById("humanizeButton");
const copyButton = document.getElementById("copyButton");
const outputText = document.getElementById("outputText");
const writingTone = document.getElementById("writingTone")


// WORD AND CHARACTER COUNTER

textInput.addEventListener("input", function () {

    const text = textInput.value;
    const trimmedText = text.trim();

    if (trimmedText === "") {
        wordCount.textContent = "0";
    } else {
        const words = trimmedText.split(/\s+/);
        wordCount.textContent = words.length;
    }

    characterCount.textContent = text.length;

});


// CLEAR BUTTON
clearButton.addEventListener("click", function () {

    textInput.value = "";
    wordCount.textContent = "0";
    characterCount.textContent = "0";

    outputText.textContent =
        "Your humanized text will appear here.";

});

// HUMANIZE BUTTON

humanizeButton.addEventListener("click", async function () {

    const text = textInput.value.trim();

    if (text === "") {
        outputText.textContent = "Please enter some text first.";
        return;
    }

    humanizeButton.textContent = "⏳ Humanizing...";
    humanizeButton.disabled = true;

    const tone = writingTone.value;
    const level = document.getElementById("humanizationLevel").value;

    try {

        const response = await fetch("https://villa-production-553c.up.railway.app/humanize", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text,
                tone: tone,
                level: level
            })

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        outputText.textContent = data.result;

    } catch (error) {

        console.error("HUMANIZER ERROR:", error);

        outputText.textContent =
            "Sorry, Villa AI could not humanize your text. Please try again.";

    } finally {

        humanizeButton.textContent = "Humanize Text";
        humanizeButton.disabled = false;

    }

});

// COPY BUTTON

copyButton.addEventListener("click", function () {

    const text = outputText.textContent;

    navigator.clipboard.writeText(text).then(function () {

        copyButton.textContent = "✓ Copied!";

        setTimeout(function () {
            copyButton.textContent = "Copy Text";
        }, 2000);

    });

});
