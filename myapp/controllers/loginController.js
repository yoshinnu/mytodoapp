const db = require('./database/databaseController')

//ログイン画面へ
const getLoginPage = (req, res) => {
  res.status(200).render('login.ejs', { title: 'Login' })
}

module.exports = {
  getLoginPage,
}