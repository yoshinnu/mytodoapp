const db = require('./database/databaseController.js');
const { validationResult } = require('express-validator');
const log = require('./logs/logController.js');
const auth = require('./auth/authController.js');
//新規登録ページへ
const getSignUpPage = async (req, res) => {
  res.status(200).render('register.ejs', { title: 'SignUp' });
};
/**新規ユーザー登録
 * 1 validationerrorの確認
 * 2 重複emailの確認 →　重複無しuser登録HOME画面へ
 */
const postCreateUser = async (req, res) => {
  // formのerror確認
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    return res.status(422).render('../views/register.ejs', { errors, title: 'SignUp' });
  }
  //emailの重複を確認
  const userCount = await db.getUserCountByemail(req.body).catch((error) => {
    console.error(error);
  });
  if (userCount > 0) {
    const message = '登録済みのメールアドレスです。';
    res.status(400).render("register", { title: 'SignUp', message: message });
  } else {
    const user = await db.createUser(req.body).catch(error => {
      console.error(error);
      return res.status(400)
    });
    auth.createToken(res, user);
    //logの登録
    log.logRegister(req.body.username, req.body.id);
    return res.status(200).redirect('/home')
  }
};
module.exports = {
  getSignUpPage,
  postCreateUser,
}