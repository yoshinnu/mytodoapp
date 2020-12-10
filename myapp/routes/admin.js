const express = require('express');
const router = express();
const auth = require('../controllers/auth/authController.js');
const adminControll = require('../controllers/adminController.js');

//get useredit page
router.get('/user/edit', adminControll.getUserEditPage);
//get shopedit page
router.get('/shop/edit', adminControll.getPrizeEditPage);
//get shopcreate page
router.get('/shop/create', adminControll.getPrizeCreatePage);
//post user delete 
router.post('/user/delete/post', auth.verifyToken, adminControll.postUserDelete);
//post user edit
router.post('/user/edit/post', auth.verifyToken, adminControll.putUserUpdate);
//post prize edit
router.post('/shop/edit/post', auth.verifyToken, adminControll.putSelectPrize);
//post prize create
router.post('/shop/create/post', auth.verifyToken, adminControll.postCreatePrize);
module.exports = router;