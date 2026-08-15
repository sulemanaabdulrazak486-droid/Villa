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
        outputText.textContent = "Please enter some text first.";
        return;
    }

    humanizeButton.textContent = "⏳ Humanizing...";
    humanizeButton.disabled = true;

    setTimeout(function () {

        let humanizedText = text;
        const selectedTone = writingTone.value;
        const selectedLevel = document.getElementById("humanizationLevel").value;

        // Basic phrase changes
const replacements = [

    // Formal connectors
    ["Furthermore,", "Also,"],
    ["Moreover,", "Also,"],
    ["Therefore,", "So,"],
    ["Consequently,", "As a result,"],
    ["However,", "But,"],
    ["Nevertheless,", "Still,"],
    ["Nonetheless,", "Still,"],
    ["In addition,", "Also,"],
    ["Additionally,", "Also,"],
    ["Similarly,", "In the same way,"],
    ["For instance,", "For example,"],
    ["For example,", "For example,"],
    ["In contrast,", "On the other hand,"],
    ["On the other hand,", "But,"],
    ["In conclusion,", "To sum up,"],
    ["To summarize,", "In short,"],
    ["As a result,", "So,"],
    ["Thus,", "So,"],
    ["Hence,", "So,"],

    // Formal verbs
    ["utilize", "use"],
    ["Utilize", "Use"],
    ["demonstrate", "show"],
    ["Demonstrate", "Show"],
    ["illustrate", "show"],
    ["Illustrate", "Show"],
    ["facilitate", "help"],
    ["Facilitate", "Help"],
    ["obtain", "get"],
    ["Obtain", "Get"],
    ["assist", "help"],
    ["Assist", "Help"],
    ["commence", "start"],
    ["Commence", "Start"],
    ["terminate", "end"],
    ["Terminate", "End"],
    ["implement", "carry out"],
    ["Implement", "Carry out"],
    ["indicate", "show"],
    ["Indicate", "Show"],
    ["demonstrates", "shows"],
    ["Demonstrates", "Shows"],
    ["establish", "set up"],
    ["Establish", "Set up"],
    ["approximately", "about"],
    ["Approximately", "About"],
    ["require", "need"],
    ["Require", "Need"],
    ["provide", "give"],
    ["Provide", "Give"],
    ["purchase", "buy"],
    ["Purchase", "Buy"],
    ["construct", "build"],
    ["Construct", "Build"],
    ["modify", "change"],
    ["Modify", "Change"],
    ["retain", "keep"],
    ["Retain", "Keep"],
    ["reside", "live"],
    ["Reside", "Live"],
    ["attempt", "try"],
    ["Attempt", "Try"],
    ["determine", "find out"],
    ["Determine", "Find out"],
    ["request", "ask for"],
    ["Request", "Ask for"],
    ["inform", "tell"],
    ["Inform", "Tell"],
    ["purchase", "buy"],
    ["numerous", "many"],
    ["Numerous", "Many"],
    ["individuals", "people"],
    ["Individuals", "People"],

    // Wordy phrases
    ["in order to", "to"],
    ["In order to", "To"],
    ["due to the fact that", "because"],
    ["Due to the fact that", "Because"],
    ["owing to the fact that", "because"],
    ["Owing to the fact that", "Because"],
    ["at this point in time", "now"],
    ["At this point in time", "Now"],
    ["at the present time", "now"],
    ["At the present time", "Now"],
    ["for the purpose of", "to"],
    ["For the purpose of", "To"],
    ["in the event that", "if"],
    ["In the event that", "If"],
    ["in the process of", "while"],
    ["In the process of", "While"],
    ["has the ability to", "can"],
    ["Has the ability to", "Can"],
    ["is able to", "can"],
    ["Is able to", "Can"],
    ["make use of", "use"],
    ["Make use of", "Use"],
    ["a large number of", "many"],
    ["A large number of", "Many"],
    ["a significant number of", "many"],
    ["A significant number of", "Many"],
    ["a considerable amount of", "a lot of"],
    ["A considerable amount of", "A lot of"],
    ["a significant amount of", "a lot of"],
    ["A significant amount of", "A lot of"],
    ["a majority of", "most"],
    ["A majority of", "Most"],
    ["a sufficient number of", "enough"],
    ["A sufficient number of", "Enough"],
    ["in the majority of cases", "usually"],
    ["In the majority of cases", "Usually"],

    // Common formal adjectives
    ["important", "key"],
    ["Important", "Key"],
    ["essential", "important"],
    ["Essential", "Important"],
    ["beneficial", "helpful"],
    ["Beneficial", "Helpful"],
    ["challenging", "difficult"],
    ["Challenging", "Difficult"],
    ["numerous", "many"],
    ["Numerous", "Many"],
    ["significant", "major"],
    ["Significant", "Major"],
    ["approximately", "about"],
    ["Approximately", "About"],
    ["sufficient", "enough"],
    ["Sufficient", "Enough"],
    ["additional", "extra"],
    ["Additional", "Extra"],
    ["optimal", "best"],
    ["Optimal", "Best"],
    ["fundamental", "basic"],
    ["Fundamental", "Basic"],
    ["substantial", "large"],
    ["Substantial", "Large"],
    ["predominantly", "mostly"],
    ["Predominantly", "Mostly"],

    // Common AI-style phrases
    ["It is important to note that", "It's worth noting that"],
    ["It should be noted that", "It's worth noting that"],
    ["It is worth mentioning that", "It's worth mentioning that"],
    ["It is evident that", "Clearly,"],
    ["It is clear that", "Clearly,"],
    ["It can be seen that", "We can see that"],
    ["It can be argued that", "Some argue that"],
    ["This demonstrates that", "This shows that"],
    ["This indicates that", "This shows that"],
    ["This highlights the importance of", "This shows why"],
    ["plays a crucial role in", "is important for"],
    ["plays a significant role in", "is important for"],
    ["is of great importance", "is very important"],
    ["has a significant impact on", "strongly affects"],
    ["make a significant contribution to", "greatly contribute to"],

    // Common phrases
    ["as a result of", "because of"],
    ["with regard to", "about"],
    ["with respect to", "about"],
    ["in relation to", "about"],
    ["in terms of", "for"],
    ["with the aim of", "to"],
    ["with a view to", "to"],
    ["by means of", "by"],
    ["on a regular basis", "regularly"],
    ["on a daily basis", "daily"],
    ["on a frequent basis", "often"],
    ["in a timely manner", "quickly"],
    ["in a simple manner", "simply"],
    ["in a careful manner", "carefully"],
    ["in a similar manner", "similarly"],

    // Conversational changes
    ["do not", "don't"],
    ["Do not", "Don't"],
    ["does not", "doesn't"],
    ["Does not", "Doesn't"],
    ["did not", "didn't"],
    ["Did not", "Didn't"],
    ["cannot", "can't"],
    ["Cannot", "Can't"],
    ["will not", "won't"],
    ["Will not", "Won't"],
    ["would not", "wouldn't"],
    ["Would not", "Wouldn't"],
    ["could not", "couldn't"],
    ["Could not", "Couldn't"],
    ["I am", "I'm"],
    ["I have", "I've"],
    ["I will", "I'll"],
    ["I would", "I'd"],
    ["you are", "you're"],
    ["You are", "You're"],
    ["we are", "we're"],
    ["We are", "We're"],
    ["they are", "they're"],
    ["They are", "They're"],
    ["it is", "it's"],
    ["It is", "It's"],
    ["there is", "there's"],
    ["There is", "There's"],

    // Simple vocabulary
    ["purchase", "buy"],
    ["purchase", "get"],
    ["obtain", "get"],
    ["acquire", "get"],
    ["acquire", "gain"],
    ["assist", "help"],
    ["attempt", "try"],
    ["require", "need"],
    ["inform", "tell"],
    ["numerous", "many"],
    ["individuals", "people"],
    ["children", "kids"],
    ["approximately", "about"],
    ["sufficient", "enough"],
    ["frequently", "often"],
    ["occasionally", "sometimes"],
    ["primarily", "mainly"],
    ["subsequently", "later"],
    ["previously", "before"],
    ["currently", "now"],
    ["currently", "right now"],
    ["regarding", "about"],
    ["concerning", "about"]

];       

        replacements.forEach(function (replacement) {

            const pattern = new RegExp(
                "\\b" + replacement[0] + "\\b",
                "gi"
            );

            humanizedText = humanizedText.replace(
                pattern,
                replacement[1]
            );

        });


        // CASUAL TONE

        if (selectedTone === "casual") {

            humanizedText = humanizedText
                .replace(/\bI am\b/gi, "I'm")
                .replace(/\bdo not\b/gi, "don't")
                .replace(/\bcannot\b/gi, "can't")
                .replace(/\bwill not\b/gi, "won't")
                .replace(/\bit is\b/gi, "it's")
                .replace(/\bthere is\b/gi, "there's")
                .replace(/\bthat is\b/gi, "that's");

        }


        // FRIENDLY TONE

        if (selectedTone === "friendly") {

            humanizedText = humanizedText
                .replace(/\bHowever\b/gi, "But")
                .replace(/\bTherefore\b/gi, "So")
                .replace(/\bFurthermore\b/gi, "Also")
                .replace(/\bIt is important to note that\b/gi, "It's worth mentioning that");

        }


        // ACADEMIC TONE

        if (selectedTone === "academic") {

            humanizedText = humanizedText
                .replace(/\buse\b/gi, "utilize")
                .replace(/\bshow\b/gi, "demonstrate")
                .replace(/\bhelp\b/gi, "assist")
                .replace(/\bstart\b/gi, "commence")
                .replace(/\bend\b/gi, "conclude");

        }


        // PROFESSIONAL TONE

        if (selectedTone === "professional") {

            humanizedText = humanizedText
                .replace(/\ba lot of\b/gi, "a considerable amount of")
                .replace(/\bbut\b/gi, "however")
                .replace(/\bso\b/gi, "therefore");

        }


        // STRONG HUMANIZATION

        if (selectedLevel === "strong") {

            humanizedText = humanizedText
                .replace(/\bvery\b/gi, "really")
                .replace(/\bimportant\b/gi, "essential")
                .replace(/\binteresting\b/gi, "worthwhile")
                .replace(/\bhelp\b/gi, "make things easier")
                .replace(/\bpeople\b/gi, "many people");

        }


        // LIGHT HUMANIZATION

        if (selectedLevel === "light") {

            humanizedText = humanizedText
                .replace(/\bvery important\b/gi, "especially important")
                .replace(/\bin addition\b/gi, "also");

        }

// SENTENCE RESTRUCTURING

if (selectedTone === "casual") {

    humanizedText = humanizedText
        .replace(/^Furthermore,\s*/i, "Also, ")
        .replace(/^Moreover,\s*/i, "Plus, ")
        .replace(/^Therefore,\s*/i, "So, ")
        .replace(/^However,\s*/i, "But ")
        .replace(/^In addition,\s*/i, "Also, ")
        .replace(/^It is important to note that\s*/i, "It's worth noting that ")
        .replace(/^It should be noted that\s*/i, "It's worth mentioning that ");

}


if (selectedTone === "friendly") {

    humanizedText = humanizedText
        .replace(/^Furthermore,\s*/i, "Also, ")
        .replace(/^Moreover,\s*/i, "What's more, ")
        .replace(/^Therefore,\s*/i, "So, ")
        .replace(/^However,\s*/i, "That said, ")
        .replace(/^In addition,\s*/i, "Also, ");

}


if (selectedTone === "professional") {

    humanizedText = humanizedText
        .replace(/^So,\s*/i, "Therefore, ")
        .replace(/^But\s+/i, "However, ")
        .replace(/^Also,\s*/i, "Additionally, ");

}


if (selectedTone === "academic") {

    humanizedText = humanizedText
        .replace(/^So,\s*/i, "Therefore, ")
        .replace(/^But\s+/i, "However, ")
        .replace(/^Also,\s*/i, "Furthermore, ")
        .replace(/^This shows that\s*/i, "This demonstrates that ");

}


// Vary common sentence patterns

humanizedText = humanizedText
    .replace(/\bIn today's world\b/gi, "Today")
    .replace(/\bIn the modern world\b/gi, "Today")
    .replace(/\bIn today's society\b/gi, "Today")
    .replace(/\bIt is important to\b/gi, "It's important to")
    .replace(/\bIt is necessary to\b/gi, "We need to")
    .replace(/\bIt is possible to\b/gi, "You can")
    .replace(/\bThere are many\b/gi, "Many")
    .replace(/\bThere is a need to\b/gi, "We need to")
    .replace(/\bDue to the fact that\b/gi, "Because")
    .replace(/\bIn order to\b/gi, "To");
        // Clean up spacing

        humanizedText = humanizedText
            .replace(/\s+/g, " ")
            .replace(/\s+([,.!?])/g, "$1")
            .trim();


        outputText.textContent = humanizedText;

        humanizeButton.textContent = "Humanize Text";
        humanizeButton.disabled = false;

    }, 800);

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
