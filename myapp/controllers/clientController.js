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
  //log取得
  const logData = await db.getLogsAll().catch((error) => {
    console.error(error);
  });
  // loglikes取得
  const logLikes = await db.getLikesAll().catch((error) => {
    console.error(error);
  });
  const logs = format.formatLogsData(logData, logLikes, user);
  console.log(logs);
  return res.status(200).json({ todoList, user, loginflg, logs });
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
//loglikecheck
const postLogLikeCreate = async function (req, res) {
  const like = {
    user_id: req.decoded.id,
    log_id: req.body.logId
  }
  await db.createLogLikes(like).catch((error) => {
    console.error(error);
  });
  res.status(200).send('OK');
};
//loglike delete
const postLogLikeDelete = async (req, res) => {
  const like = {
    user_id: req.decoded.id,
    log_id: req.body.logId
  }
  await db.deleteLogLikes(like).catch((error) => {
    console.error(error);
  });
  res.status(200).send('OK');
};
module.exports = {
  getTodolistData,
  postUserPoint,
  postLogLikeCreate,
  postLogLikeDelete,
}