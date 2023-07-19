const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/api/update-has-pet', userController.updateHasPet);

module.exports = router;
