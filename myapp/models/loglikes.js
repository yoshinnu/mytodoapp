'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class loglikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  loglikes.init({
    userID: DataTypes.INTEGER,
    logID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'loglikes',
    underscored: true,
  });
  return loglikes;
};