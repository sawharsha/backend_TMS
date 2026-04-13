const express = require('express');

const { registerUser, loginUser,getUserProfile, getAllUsers, getTrainees} = require('../controllers/authController');

const protect = require('../middlewares/authMiddleware');

const authorizeRoles = require('../middlewares/roleMiddleware');

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Get all users (trainer only)
router.get("/all-users", protect, authorizeRoles("trainer"), getAllUsers);

//get all trainees (trainer only)
router.get("/trainees", protect, authorizeRoles("trainer"), getTrainees);

module.exports = router;