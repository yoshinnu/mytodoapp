const express = require('express');
const router = express.Router();
const clientControll = require('../controllers/clientController.js');
const auth = require('../controllers/auth/authController.js');
//get todolist
router.get('/tododata', auth.verifyToken, clientControll.getTodolistData);

module.exports = router;