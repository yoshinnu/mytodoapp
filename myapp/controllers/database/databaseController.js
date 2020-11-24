const model = require('../../models');
//create user by body
const createUser = function (user) {
  return model.users.create(user);
};
//count user by email
const getUserCountByemail = function (user) {
  return model.users.count({
    where: {
      email: user.email
    }
  });
};

module.exports = {
  createUser,
  getUserCountByemail,

}