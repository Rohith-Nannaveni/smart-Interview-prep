const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; // to extract token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            next();
        }
        else {
            res.status(401).json({ message: "Not Authorized, Token Not Found" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Token Failed", error: error.message })
    }
};

module.exports = { protect };