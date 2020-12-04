const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/authController.js');
const userControll = require('../controllers/userController.js');
const check = require('../controllers/validation/validation.js');
//get user settings page
router.get('/setting', auth.verifyToken, userControll.getUserSettingPage);
//post user settings update
router.post('/setting/post', auth.verifyToken, check.updateCheck, userControll.postUserInfo);

module.exports = router;