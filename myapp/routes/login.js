const express = require('express');
const router = express.Router();
const loginControll = require('../controllers/loginController');

//get login page
router.get('/', loginControll.getLoginPage);

module.exports = router;
