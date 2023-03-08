const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openAi = new OpenAIApi(configuration);

app.post("/explain-code", async (req, res) => {
    try {
        const { prompt } = req.body;
        const { model } = req.body;
        const response = await openAi.createCompletion({
            model: model,
            prompt: `
            ${prompt}
            
            Here's what the above code snippet is doing:\n1.`,
            temperature: 0,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\"\"\""],
        });

        return res.status(200).json({
            success: true,
            data: response.data.choices[0]
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : "There is an issue with the server"
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));