const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
app.use(cors());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.post("/humanize", async (req, res) => {

    try {

        const { text, tone, level } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const prompt = `
You are Villa AI Humanizer.

Rewrite the user's text so it sounds natural, fluent, and human-written.

Preserve:
- The original meaning
- Important facts
- The user's main ideas

Do not:
- Invent facts
- Add information that wasn't provided
- Change the meaning
- Mention that you are an AI
- Explain what you changed

Writing tone: ${tone || "professional"}
Humanization level: ${level || "standard"}

Return ONLY the rewritten text.

User's text:
${text}
`;

const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt
});

res.json({
    result: interaction.output_text || ""
});
        
    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: "Villa AI could not process the text."
        });

    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Villa AI is running at http://localhost:${PORT}`);
});