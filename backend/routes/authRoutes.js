const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/api/register', authController.registerUser);
router.post('/api/login', authController.loginUser);
router.get('/api/logout', authController.logoutUser);

module.exports = router;
