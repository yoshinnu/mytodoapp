const db = require('./database/databaseController')
const bcrypt = require('bcrypt');
const auth = require('./auth/authController');
//ログイン画面へ
const getLoginPage = (req, res) => {
  res.status(200).render('login.ejs', { title: 'Login' })
}
/**login処理
 *  emailからuser情報取得
 *  jwttoken付与
 *  homeへ
 */
const postLoginUser = async (req, res) => {
  //user情報取得
  const user = await db.getUserByEmail(req.body.email)
    .catch((error) => {
      console.error(error);
      res.status(400);
    });
  if (user.is_admin === 0) {
    // jwt作成
    auth.createToken(res, user);
    // home画面へ
    return res.status(200).redirect('/home');
  }
  if (user && user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
    // jwt作成
    auth.createToken(res, user);
    // home画面へ
    return res.status(200).redirect('/home');
  } else {
    // その他の処理
    return res.status(400).render('login.ejs', { title: 'Login', message: 'ユーザー情報に誤りがあります。' });
  }
};
//logout処理
const getLogout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).redirect('/');
};
module.exports = {
  getLoginPage,
  postLoginUser,
  getLogout,
}