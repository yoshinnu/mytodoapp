const express = require('express');
const router = express.Router();
const clientControll = require('../controllers/clientController.js');
const auth = require('../controllers/auth/authController.js');
//get todolist
router.get('/tododata', auth.verifyToken, clientControll.getTodolistData);
//get userdate
// router.get('/user/prize', auth.verifyToken, clientControll.getUserAndPrizeData);
//post userPoint
router.post('/user/update', auth.verifyToken, clientControll.postUserPoint);
//post loglike 
router.post('/like/create', auth.verifyToken, clientControll.postLogLikeCreate);
//post loglike delete
router.post('/like/delete', auth.verifyToken, clientControll.postLogLikeDelete);
module.exports = router;