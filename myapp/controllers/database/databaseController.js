const model = require('../../models');
const bcrypt = require('bcrypt');
const format = require('../class/dataFormat.js');
//create user by body
const createUser = function (user) {
  const defaultPoint = 100;
  const password = user.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const date = new format().current;
  const userData = {
    username: user.username,
    email: user.email,
    password: hashedPassword,
    point: defaultPoint,
    achivement_id: 1,
    is_admin: 1,
    login_date: date
  }
  return model.users.create(userData);
};
//count user by email
const getUserCountByemail = function (user) {
  return model.users.count({
    where: {
      email: user.email
    }
  });
};
//get user by email
const getUserByEmail = function (userEmail) {
  return model.users.findOne({
    where: {
      email: userEmail
    }
  })
};
//get user by id
const getUserById = function (userId) {
  return model.users.findByPk(userId);
};
//create todo 
const createTodoData = function (todoData) {
  return model.todolists.create(todoData);
};
//get todolist one by id
const getTodoById = function (todoId) {
  return model.todolists.findByPk(todoId);
};
//get todolist all by id
const getTodolistById = function (userId) {
  return model.todolists.findAll({
    where: { user_id: userId }
  });
};
module.exports = {
  createUser,
  getUserCountByemail,
  getUserByEmail,
  getUserById,
  createTodoData,
  getTodoById,
  getTodolistById,

}