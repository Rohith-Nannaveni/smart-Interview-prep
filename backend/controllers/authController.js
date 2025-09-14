const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

// @desc Register a new User
// @route POST /api/auth/register
// @access public

const registerUser = async(req,res) => {
};

// @desc Login User
// @route POST /api/auth/login
// @access public

const loginUser = async(req,res) => {
};

// @desc get User Profile
// @route POST /api/auth/profile
// @access private (Requires JWT)

const getUserProfile = async(req,res) => {
};

module.exports = { registerUser,loginUser,getUserProfile };