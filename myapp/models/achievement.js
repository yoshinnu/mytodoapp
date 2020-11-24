'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  achievement.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'achievement',
    underscored: true,
  });
  return achievement;
};