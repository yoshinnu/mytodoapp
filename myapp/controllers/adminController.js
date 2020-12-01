const db = require('./database/databaseController.js');


//user情報画面へ
const getUserEditPage = async (req, res) => {
  const user = await db.getUserById(req.query.id).catch(error => {
    console.error(error);
  });
  console.log(user);
  res.status(200).render('adminuseredit.ejs', { title: 'admin useredit', user });
};
//user情報を更新
const putUserUpdate = async (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    point: req.body.point,
    is_admin: req.body.admin
  }
  await db.putSelectUserPointById(req.body.id, userData).catch(error => {
    console.error(error);
  });
  res.status(200).redirect('/home');
}
//user情報を削除
const postUserDelete = async (req, res) => {
  await db.deleteUserById(req.body.id).catch((error) => {
    console.error(error);
  });
  res.status(200).redirect('/home');
};
//shopcreate画面へ
const getPrizeCreatePage = (req, res) => {
  res.status(200).render('adminshopcreate.ejs', { title: 'Prize Create' });
}
//shopedit画面へ
const getPrizeEditPage = (req, res) => {
  const selectPrize = {
    id: req.query.id,
    pointcost: req.query.pointcost
  }
  res.status(200).render('adminshopedit.ejs', { title: 'Prize Edit', prize: selectPrize });
};
//prize作成
const postCreatePrize = async (req, res) => {
  const prizeData = {
    name: req.body.name,
    pointcost: req.body.pointcost
  }
  await db.createPrizeData(prizeData).catch(error => {
    console.error(error);
  });
  res.status(200).redirect('/home/shop');
}
//prize更新
const putSelectPrize = async (req, res) => {
  const prizeData = {
    pointcost: req.body.pointcost
  }
  await db.putPrizeById(req.body.id, prizeData).catch(error => {
    console.error(error);
  });
  res.status(200).redirect('/home/shop');
}
module.exports = {
  postUserDelete,
  getUserEditPage,
  putUserUpdate,
  getPrizeEditPage,
  putSelectPrize,
  getPrizeCreatePage,
  postCreatePrize,
}