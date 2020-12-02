const db = require('../database/databaseController.js');

//新規登録log
const logRegister = async function (userName, userId) {
  const log = {
    text: userName + 'さんが参加しました。',
    user_id: userId
  }
  await db.createLogs(log).catch(error => {
    console.error(error);
  });
}
//todo完了log
const logTodoDone = async function (user, todoTitle) {
  const log = {
    text: user.username + 'さんが' + todoTitle + 'を達成！',
    user_id: user.id
  }
  await db.createLogs(log).catch(error => {
    console.error(error);
  });
}
module.exports = {
  logRegister,
  logTodoDone,

}