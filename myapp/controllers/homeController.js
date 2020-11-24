const db = require('../controllers/database/databaseController.js');

//HOME画面へ
const getHomePage = (req, res) => {
  res.status(200).render('home.ejs', { title: 'Home' });
}

module.exports = {
  getHomePage,
}