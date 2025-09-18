const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicToFocus || !numberOfQuestions) {
            return res.status(400).json({
                message: "Provide all required fields",
                missing: {
                    role: !role,
                    experience: !experience,
                    topicToFocus: !topicToFocus,
                    numberOfQuestions: !numberOfQuestions,
                },
            });
        }

        const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: prompt,
        });

        let rawText = response.text;

        // Clean the response to get valid JSON
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // Remove starting ```json
            .replace(/```$/, "") // Remove ending ```
            .trim();

        //Now it's good to parse    
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message,
        });
    }
};

// @desc Generate concept explanation using Gemini
// @route POST /api/ai/generate-explanation
// @access Private

const generateConceptExplanation = async (req, res) => {

}

module.exports = { generateInterviewQuestions, generateConceptExplanation }