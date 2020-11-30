'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todolists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todolists.belongsTo(models.users, {
        onDelete: 'CASCADE',
        foreinKey: 'id'
      });
    }
  };
  todolists.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    status: DataTypes.INTEGER,
    limit: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'todolists',
    underscored: true,
  });
  return todolists;
};