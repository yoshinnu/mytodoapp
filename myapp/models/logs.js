'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logs.belongsToMany(models.users, {
        through: models.loglikes,
        onDelete: 'CASCADE',
        foreignKey: 'logID',
        otherKey: 'userID'
      });
    }
  };
  logs.init({
    logText: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'logs',
    underscored: true,
  });
  return logs;
};