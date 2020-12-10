const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth/authController.js')
const todoCheck = require('../controllers/validation/validation.js');
const homeControll = require('../controllers/homeController.js')

//get homepage
router.get('/', auth.verifyToken, homeControll.getHomePage);

//get creatpage
router.get('/todo', auth.verifyToken, homeControll.getTodoCreatePage);

//get editpage
router.get('/edit', auth.verifyToken, homeControll.getTodoEditPage);

//get shoppage
router.get('/shop', auth.verifyToken, homeControll.getShopPage);

//post create todo
router.post('/todo/create', auth.verifyToken, todoCheck.todoCheck, homeControll.postCreateTodo);

//post edit todo
router.post('/edit/post', auth.verifyToken, todoCheck.todoCheck, homeControll.postEditTodo);

//post delete todo
router.post('/delete/post', auth.verifyToken, homeControll.postTodoDelete);

//post todoupdate status
router.post('/done/post', auth.verifyToken, homeControll.postTodocomplete);

//post buy prize
router.post('/shop/post', auth.verifyToken, homeControll.postBuyPrize);

module.exports = router;