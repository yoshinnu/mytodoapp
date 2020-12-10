const db = require('./database/databaseController.js');
const { validationResult } = require('express-validator');
const dateClass = require('./class/dataFormat.js');
const format = new dateClass();
const mailer = require('./schedule/mailer.js');
const getUserSettingPage = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  //prizename pointcost 取得
  const prizeAll = await db.getPrizeAll()
    .catch((error) => {
      console.error(error);
    });
  //userのprize取得情報取得
  const prizeMaster = await db.getPrizeIdByUserId(user.id).catch((error) => {
    console.error(error);
    res.status(400).send;
  });
  //userがprizeを持っていたら
  let prizeList;
  if (prizeMaster.length !== 0) {
    //prizeListにuserの持っていないprize情報を格納
    prizeList = format.formatUserPrizeInfo(prizeAll, prizeMaster);
  }
  res.status(200).render('usersetting.ejs', { title: 'User Setting', user, prizeList });
};
//user情報更新
const postUserInfo = async (req, res) => {
  // formのerror確認
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    console.error(errors);
    return res.status(422).render('../views/register.ejs', { errors, title: 'SignUp' });
  }
  const user = {
    username: req.body.username,
    email: req.body.email,
    select_style: req.body.select_style
  }
  //user情報をDBに更新
  await db.putSelectUserById(req.decoded.id, user).catch(error => {
    console.error(error);
  });
  res.status(200).redirect('/home');
}
//お問い合わせ画面へ
const getUserMailPage = (req, res) => {
  res.status(200).render('usermail.ejs', { title: 'Contact Us' });
};
//お問い合わせ送信
const postUserSend = async (req, res) => {
  const receiveMailAdrres = process.env.EMAILADRESS;
  await mailer.sendMail(req.body.title, req.body.text, receiveMailAdrres);
  res.status(200).redirect('/');
}
module.exports = {
  getUserSettingPage,
  postUserInfo,
  getUserMailPage,
  postUserSend
}