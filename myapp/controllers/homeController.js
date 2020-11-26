const db = require('../controllers/database/databaseController.js');
const dateClass = require('./class/dataFormat.js');
//HOME画面へ
const getHomePage = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  res.status(200).render('home.ejs', { title: 'Home', user });
}
//todocreate画面へ
const getTodoCreatePage = async (req, res) => {
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  res.status(200).render('todocreate.ejs', { title: 'Todo', user });
}
//todoedit画面へ
const postTodoEditPage = async (req, res) => {
  const todoData = await db.getTodoById(req.body.id);
  res.status(200).render('todoedit.ejs', { title: 'Todo Edit', todoData });
}
//tododata作成
const postCreateTodo = async (req, res) => {
  //user情報取得
  const user = await db.getUserById(req.decoded.id)
    .catch((error) => {
      console.error(error);
    });
  const limit = new dateClass().formatDateToInt(req.body.limit);
  //todoData作成  
  const todoData = {
    user_id: user.id,
    title: req.body.title,
    text: req.body.text,
    limit,
    status: req.body.status
  }
  if (todoData.status === undefined) { todoData.status = 0 };
  await db.createTodoData(todoData).catch((error) => {
    console.error(error);
    return res.status(400);
  });
  return res.status(200).render('home.ejs', { title: 'Home', user })
}
/**TODO
 * クライアント側からのgetでリストのデータを送る
 * todolistの削除処理
 * 
 */
module.exports = {
  getHomePage,
  getTodoCreatePage,
  postTodoEditPage,
  postCreateTodo,
}