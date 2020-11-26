const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/authController.js')
const homeControll = require('../controllers/homeController.js')

//get homepage
router.get('/', auth.verifyToken, homeControll.getHomePage);
//get creatpage
router.get('/todo', auth.verifyToken, homeControll.getTodoCreatePage);

//post create todo
router.post('/todo/create', auth.verifyToken, homeControll.postCreateTodo);

module.exports = router;