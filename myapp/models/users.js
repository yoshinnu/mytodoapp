'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      users.hasMany(models.todolists, {
        foreignKey: 'userID',
        sourceKey: 'id'
      });
    }
  };
  users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    point: DataTypes.INTEGER,
    achivementID: DataTypes.INTEGER,
    twitterID: DataTypes.STRING,
    isAdmin: DataTypes.INTEGER,
    loginDate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
  });
  return users;
};