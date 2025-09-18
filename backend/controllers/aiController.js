const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate_questions
// @access Private

const generateInterviewQuestions = async(req,res) => {
    try{

    }catch(error){
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message,
        });
    }
};

// @desc Generate concept explanation using Gemini
// @route POST /api/ai/generate_explanation
// @access Private

const generateConceptExplanation = async(req,res) =>{
    
}
