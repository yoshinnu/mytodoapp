const db = require('../database/databaseController.js');
const schedule = require('node-schedule');
const setDate = '0 0 0 * * *';
const dateClass = require('../class/dataFormat.js');
const mailer = require('./mailer.js');
const format = new dateClass();

const limitTodoEmail = function () {
  schedule.scheduleJob(setDate, async () => {
    const todoList = await getTodoList().catch(error => {
      console.error(error);
    });
    const users = await getUsersAll().catch(error => {
      console.error(error);
    });
    todoList.forEach(async (todo) => {
      if (format.checkLimitOverDate(todo.limit)) {
        await db.deleteTodoByid(todo.id).catch(error => {
          console.error(error);
        });
      }
      if (format.checkLimitDate(todo.limit)) {
        const todoUser = users.find(user => todo.user_id === user.id);
        const title = 'mytodoからのお知らせ';
        const text = todoUser.username + 'さんの' + todo.title + 'の期限一日前です。'
        mailer.sendMail(title, text, user.email);
      }
    })
  });
};

const getTodoList = () => {
  const todoList = db.getTodoAll();
  return todoList;
};
const getUsersAll = () => {
  const users = db.getUserAll();
  return users;
};
module.exports = { limitTodoEmail }