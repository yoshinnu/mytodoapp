const express = require('express');
const router = express.Router();
const homeControll = require('../controllers/homeController')

//get homepage
router.get('/', homeControll.getHomePage);

module.exports = router;