"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  content.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "content",
    }
  );
  return content;
};
