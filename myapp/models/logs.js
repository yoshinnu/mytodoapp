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
        foreignKey: 'log_id',
        otherKey: 'user_id'
      });
      logs.belongsTo(models.users, {
        onDelete: 'CASCADE',
        foreinKey: 'id'
      });
    }

  };
  logs.init({
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'logs',
    underscored: true,
  });
  return logs;
};