const express = require('express');
const router = express.Router();
const userCheck = require('../controllers/validation/validation.js');
const registerControll = require('../controllers/registerController.js');
// get signup page
router.get('/', registerControll.getSignUpPage);
// post createuser go to home page 
router.post('/create', userCheck.signupCheck, registerControll.postCreateUser);
module.exports = router;
