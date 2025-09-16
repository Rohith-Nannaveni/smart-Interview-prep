const Session = require('../models/Session');
const Question = require('../models/Question');

//@desc create a new session and linked questions
//@route POST /api/sessions/create
//@access Private
const createSession = async (req, res) => {
    try{
        const {role, experience, topicsToFocus, description, questions} = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async (q)=>{
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({success: true, session});
    }catch(err){
        res.status(500).json({success: false, message: "Server error"});
    }
};

//@desc get all sessions for logged in user
//@route GET /api/sessions/my-sessions
//@access Private
const getMySessions = async (req, res) => {
    try {
        // Check if user exists in request
        if (!req.user) {
            console.error('No user in request');
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Log user info for debugging
        console.log('User in request:', {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        });

        // Attempt to find sessions
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'questions',
                select: '-__v'
            })
            .select('-__v')
            .lean()
            .exec();

        console.log(`Found ${sessions.length} sessions for user ${req.user._id}`);
        
        return res.status(200).json(sessions);
    } catch (err) {
        console.error('Error in getMySessions:', {
            error: err.message,
            stack: err.stack,
            user: req.user?._id
        });
        
        return res.status(500).json({
            success: false,
            message: "Failed to fetch sessions",
            error: err.message
        });
    }
};

//@desc get a session by id with populated questions
//@route GET /api/sessions/:id
//@access Private
const getSessionById = async (req, res) => {
    try{
        const session = await Session.findById(req.params.id)
            .populate({
                path: 'questions',
                options:{ sort: {isPinned:-1, createdAt: 1 } },
            })
            .exec();

            if(!session){
                return res.status(404).json({success: false, message: "Session not found"});
            }
            res.status(200).json({success: true, session});
    }catch(err){
        res.status(500).json({success: false, message: "Server error"});
    }
}

//@desc delete a session by id
//@route DELETE /api/sessions/:id
//@access Private
const deleteSession = async (req, res) => {
    try{
        const session = await Session.findById(req.params.id);
        if(!session){
            return res.status(404).json({success: false, message: "Session not found"});
        }

        //check if the user is the owner of the session
        if(session.user.toString() !== req.user.id){
            return res.status(401).json({success: false, message: "Not authorized"});
        }

        //delete all questions linked to this session
        await Question.deleteMany({session: session._id});

        //delete the session
        await session.deleteOne();

        res.status(200).json({ message: "Session deleted successfully"});
    }catch(error){
        res.status(500).json({success: false, message: "Server error"});
    }
}

module.exports = {createSession, getSessionById, getMySessions, deleteSession};