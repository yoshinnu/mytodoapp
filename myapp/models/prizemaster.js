'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prizemaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  prizemaster.init({
    user_id: DataTypes.INTEGER,
    prize_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'prizemaster',
    underscored: true,
  });
  return prizemaster;
};