const db = require('./database/databaseController');
// useridからtodoリストをclient側に送る処理
const getTodolistData = async (req, res) => {
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  const todoList = await db.getTodolistById(req.decoded.id);
  console.log(todoList);
  return res.status(200).json({ todoList, user });
}
module.exports = {
  getTodolistData,

}