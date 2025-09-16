const Question = require("../models/Question");
const Session = require("../models/Session");

//@desc add questions to a session
//@route POST /api/questions/add
//@access private
const addQuestionsToSession = async (req, res) => {
    try{
        const {sessionId, questions} = req.body;

        if(!sessionId || !questions || !Array.isArray(questions) ){
            return res.status(400),json({message: "Invalid data" });
        }

        const session = await Session.findById(sessionId);

        if(!session){
            return res.status(404).json({ message: "Session not found" });
        }

        //create questions
        const createdQuestions = await Question.insertMany(
            questions.map((q)=>({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        //update session with new questions
        session.questions = [...session.questions, ...createdQuestions.map((q)=>q._id)];
        await session.save();

        res.status(201).json(createdQuestions);
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
};

//@desc toggle pin a question
//@route PUT /api/questions/:id/pin
//@access private   
const togglePinQuestion = async (req, res) => {
    try{
        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({ message: "Question not found" });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({success: true, question});


    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
};

//@desc update question note
//@route POST /api/questions/:id/note
//@access private   
const updateQuestionNote = async (req, res) => {
    try{
        const { note } = req.body;

        const question = await Question.findById(req.params.id);    

        if(!question){
            return res.status(404).json({success: false, message: "Question not found" });
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({success: true, question});
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addQuestionsToSession, togglePinQuestion, updateQuestionNote };