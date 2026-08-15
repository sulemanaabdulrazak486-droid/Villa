const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.post("/humanize", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const response = await openai.responses.create({
            model: "gpt-5-mini",
            instructions:
                "You are Villa AI Humanizer. Rewrite the user's text so it sounds natural, clear, fluent, and human-written. Preserve the original meaning and important facts. Do not add information that was not in the original text.",
            input: text
        });

        res.json({
            result: response.output_text
        });

    } catch (error) {
        console.error("OPENAI ERROR:", error);

        res.status(500).json({
            error: "Villa AI could not process the text."
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Villa AI is running at http://localhost:${PORT}`);
});