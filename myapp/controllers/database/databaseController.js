const model = require('../../models');
const bcrypt = require('bcrypt');
const format = require('../class/dataFormat.js');

// USER
//create user by body
const createUser = function (user) {
  const defaultPoint = 100;
  const password = user.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const date = new format().current;
  console.log(date);
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
//get user all
const getUserAll = function () {
  return model.users.findAll();
};
//get user by id
const getUserById = function (userId) {
  return model.users.findByPk(userId);
};
//get user by id prize
const getUserPrizeById = function (userId) {
  return model.prizes.findAll({
    include: {
      model: model.users,
      required: true,
      where: {
        id: userId
      }
    }
  });
}
//user delete by id
const deleteUserById = function (userId) {
  return model.users.destroy({ where: { id: userId } });
};

//user update point by id
const putSelectUserPointById = function (userId, user) {
  return model.users.update(user, { where: { id: userId } });
}
//user update
const putSelectUserById = function (userId, user) {
  return model.users.update(user, { where: { id: userId } });
}
//TODO
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
//get todolist all by user id and status
const getCompeleteTodolistByIdAndStatus = function (userId) {
  return model.todolists.findAll({
    where: {
      id: userId,
      status: {
        $lt: 0
      }
    }
  });
};
//get todolist all 
const getTodoAll = function () {
  return model.todolists.findAll();
};
//update todo one 
const putSelectTodo = function (todoData) {
  return model.todolists.update(todoData, { where: { id: todoData.id } });
};
//update todo one status by id
const putStatusTodoById = function (todoId) {
  return model.todolists.update(
    { status: '-1' },
    { where: { id: todoId } }
  );
};
//delete todo one
const deleteTodoByid = function (todoId) {
  return model.todolists.destroy({
    where: { id: todoId }
  });
};
//PRIZE
//select prize all
const getPrizeAll = function () {
  return model.prizes.findAll();
};
//create prizemaster
const createPrizeMaster = function (userId, prizeId) {
  const product = {
    user_id: userId,
    prize_id: prizeId
  }
  return model.prizemaster.create(product);
};
//select prizemaster by userid
const getPrizeIdByUserId = function (userId) {
  return model.prizemaster.findAll({ where: { user_id: userId } });
};
//create prize
const createPrizeData = function (prizeData) {
  return model.prizes.create(prizeData);
};
//update prize by id
const putPrizeById = function (prizeId, prizeDate) {
  return model.prizes.update(prizeDate, { where: { id: prizeId } });
};
//Logs
//create log register
const createLogs = function (log) {
  return model.logs.create(log);
};
//select log all
const getLogsAll = function () {
  return model.logs.findAll();
};
//select loglikes all
const getLikesAll = function () {
  return model.loglikes.findAll();
};
//create loglikes 
const createLogLikes = (like) => {
  return model.loglikes.create(like);
};
//delete loglikes
const deleteLogLikes = (like) => {
  return model.loglikes.destroy({ where: like });
}
module.exports = {
  createUser,
  getUserCountByemail,
  getUserByEmail,
  getUserAll,
  getUserById,
  createTodoData,
  getTodoById,
  getTodolistById,
  putSelectTodo,
  putStatusTodoById,
  deleteTodoByid,
  getCompeleteTodolistByIdAndStatus,
  getUserPrizeById,
  getPrizeAll,
  createPrizeMaster,
  putSelectUserPointById,
  putSelectUserById,
  getPrizeIdByUserId,
  deleteUserById,
  createPrizeData,
  putPrizeById,
  createLogs,
  getLogsAll,
  getLikesAll,
  createLogLikes,
  deleteLogLikes,
  getTodoAll,
}