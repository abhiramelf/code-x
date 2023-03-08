// Explain code route

// Al initializations
const router = require('express').Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openAi = new OpenAIApi(configuration);

// Post route which sends the request that contains the code prompt and gets the explanation as the response
router.post("/explain", async (req, res) => {
    try {
        const { model } = req.body;
        const { prompt } = req.body;
        const { max_tokens } = req.body;
        const { stop } = req.body;

        const response = await openAi.createCompletion({
            model: model,
            prompt: `
            ${prompt}
            
            Here's what the above code snippet is doing:\n1.`,
            temperature: 0,
            max_tokens: max_tokens,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: [`${stop}`],
        });

        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : "There is an issue with the server"
        });
    }
});

module.exports = router;