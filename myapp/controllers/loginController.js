const db = require('./database/databaseController')
const bcrypt = require('bcrypt');
const auth = require('./auth/authController');
//ログイン画面へ
const getLoginPage = (req, res) => {
  res.status(200).render('login.ejs', { title: 'Login' })
}
/**login処理
 * 1 emailからuser情報取得
 * 2 jwttoken付与
 * 3 homeへ
 */
const postLoginUser = async (req, res) => {
  // 1
  const user = await db.getUserByEmail(req.body.email)
    .catch((error) => {
      console.error(error);
      res.status(400);
    });
  if (user && user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
    // 2
    auth.createToken(res, user);
    // 3
    return res.status(200).render('home.ejs', { title: 'Home', user: user });
  } else {
    // その他の処理
    return res.status(400).render('login.ejs', { title: 'Login', message: 'ユーザー情報に誤りがあります。' });
  }
};
//logout処理
const getLogout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).render('login', { title: 'Login' });
};
module.exports = {
  getLoginPage,
  postLoginUser,
  getLogout,
}