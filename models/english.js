'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class English extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  English.init({
    word: DataTypes.STRING,
    meaning: DataTypes.STRING,
    sameword1: DataTypes.STRING,
    sameword2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'English',
  });
  return English;
};