const db = require('./database/databaseController.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
//新規登録ページへ
const getSignUpPage = (req, res) => {
  res.status(200).render('register.ejs', { title: 'SignUp' });
};
/**新規ユーザー登録
 * 1 validationerrorの確認
 * 2 重複emailの確認 →　重複無しuser登録HOME画面へ
 */
const postCreateUser = async (req, res) => {
  // 1
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    res.status(422).render('../views/register.ejs', { errors, title: 'SignUp' });
    return;
  }
  // 2
  const defaultPoint = 100;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const date = getCurrentDate();
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    point: defaultPoint,
    achivement_id: 1,
    is_admin: 1,
    login_date: date
  }
  const userCount = await db.getUserCountByemail(req.body).catch((error) => {
    console.error(error);
  });
  if (userCount > 0) {
    const message = '登録済みのメールアドレスです。';
    res.status(400).render("register", { title: 'SignUp', message: message });
  } else {
    db.createUser(user).catch(error => {
      console.error(error);
      res.status(400).redirect('/signup', { title: 'SignUp', message: 'もう一度登録してください。' })
    });
    res.status(200).render('home.ejs', { title: 'Home', user: user })
  }
};
module.exports = {
  getSignUpPage,
  postCreateUser,
}

/**現在日時取得関数
 * 引数　　なし
 * 戻り値　int 現在日時
 */
function getCurrentDate() {
  require('date-utils');
  const now = new Date();
  let date = now.toFormat('YYYYMMDDHH24');
  return date;
}