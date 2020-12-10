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
        foreignKey: 'user_id',
        sourceKey: 'id'
      });
      users.hasMany(models.logs, {
        foreignKey: 'user_id',
        sourceKey: 'id'
      });
    }
  };
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    point: DataTypes.INTEGER,
    select_style: DataTypes.STRING,
    achivement_id: DataTypes.INTEGER,
    twitter_id: DataTypes.STRING,
    is_admin: DataTypes.INTEGER,
    login_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
  });
  return users;
};