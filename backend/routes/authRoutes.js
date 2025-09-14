const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router()

// Auth Routes
router.post("/register", registerUser); // for user registration
router.post("/login", loginUser);   // User login
router.get("/profile", protect, getUserProfile); // get user profile

module.exports = router;