const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new User
// @route POST /api/auth/register
// @access public

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } =
            req.body;

        // check  if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        // hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        // Return user data with JWT

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Login User
// @route POST /api/auth/login
// @access public

const loginUser = async (req, res) => {
};

// @desc get User Profile
// @route POST /api/auth/profile
// @access private (Requires JWT)

const getUserProfile = async (req, res) => {
};

module.exports = { registerUser, loginUser, getUserProfile };