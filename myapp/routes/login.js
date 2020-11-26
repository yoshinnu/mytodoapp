const express = require('express');
const router = express.Router();
const loginControll = require('../controllers/loginController');

//get login page
router.get('/', loginControll.getLoginPage);
//post login user
router.post('/login/home', loginControll.postLoginUser);
//get logout
router.get('/logout', loginControll.getLogout);

module.exports = router;
