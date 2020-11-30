const db = require('./database/databaseController');
const dateClass = require('./class/dataFormat');
const format = new dateClass();
// useridからtodoリストをclient側に送る処理
const getTodolistData = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  //loginボーナス check
  const loginflg = format.lowerThanDateOnly(user.login_date);
  //todo情報取得
  const todoList = await db.getTodolistById(req.decoded.id).catch((error) => {
    console.error(error);
  });
  return res.status(200).json({ todoList, user, loginflg });
};
//user point 更新
const postUserPoint = async (req, res) => {
  const login_date = format.current;
  const userData = {
    point: req.body.point,
    login_date
  }
  await db.putSelectUserPointById(req.decoded.id, userData).catch((error) => {
    console.error(error);
  });
  return res.status(200).send('OK');
};
module.exports = {
  getTodolistData,
  postUserPoint,
}