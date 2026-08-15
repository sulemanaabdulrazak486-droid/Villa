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

humanizeButton.addEventListener("click", function () {

    const text = textInput.value.trim();

    if (text === "") {
        outputText.textContent =
            "Please enter some text first.";
        return;
    }

    humanizeButton.textContent = "⏳ Humanizing...";
    humanizeButton.disabled = true;

    setTimeout(function () {

        let humanizedText = text;
	let selectedTone = writingTone.value;

        const replacements = [
            ["Furthermore,", "Also,"],
            ["Therefore,", "So,"],
            ["However,", "But,"],
            ["utilize", "use"],
            ["approximately", "about"],
            ["demonstrate", "show"],
            ["numerous", "many"],
            ["individuals", "people"],
            ["in order to", "to"],
            ["It is important to note that", "It's worth noting that"],
            ["due to the fact that", "because"],
            ["a significant amount of", "a lot of"]
        ];

        replacements.forEach(function (replacement) {

            const pattern = new RegExp(
                replacement[0],
                "gi"
            );

            humanizedText =
                humanizedText.replace(
                    pattern,
                    replacement[1]
                );

        });
// WRITING TONE

if (selectedTone === "casual") {
    humanizedText = humanizedText
        .replace(/\bI am\b/gi, "I'm")
        .replace(/\bdo not\b/gi, "don't")
        .replace(/\bcannot\b/gi, "can't")
        .replace(/\bwill not\b/gi, "won't")
        .replace(/\bit is\b/gi, "it's")
        .replace(/\bthere is\b/gi, "there's");
}

if (selectedTone === "friendly") {
    humanizedText = humanizedText
        .replace(/\bFurthermore\b/gi, "Also")
        .replace(/\bTherefore\b/gi, "So")
        .replace(/\bHowever\b/gi, "But")
        .replace(/\butilize\b/gi, "use")
        .replace(/\bdemonstrate\b/gi, "show");
}

if (selectedTone === "academic") {
    humanizedText = humanizedText
        .replace(/\buse\b/gi, "utilize")
        .replace(/\bshow\b/gi, "demonstrate")
        .replace(/\bhelp\b/gi, "facilitate")
        .replace(/\bstart\b/gi, "commence");
}

if (selectedTone === "professional") {
    humanizedText = humanizedText
        .replace(/\ba lot of\b/gi, "a significant amount of")
        .replace(/\bbut\b/gi, "however")
        .replace(/\bso\b/gi, "therefore");
}
        outputText.textContent = humanizedText;

        humanizeButton.textContent = "Humanize Text";
        humanizeButton.disabled = false;

    }, 1000);

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
