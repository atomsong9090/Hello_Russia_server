"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { user, like, content, comment, image } = sequelize.models;
user.hasMany(content, { foreignKey: "userId", sourceKey: "id" });
content.belongsTo(user, { foreignKey: "userId", targetKey: "id" });
user.hasMany(comment, { foreignKey: "userId", sourceKey: "id" });
comment.belongsTo(user, { foreignKey: "userId", targetKey: "id" });
content.hasMany(comment, { foreignKey: "contentId", sourceKey: "id" });
comment.belongsTo(content, { foreignKey: "contentId", targetKey: "id" });
content.hasMany(like, { foreignKey: "contentId", sourceKey: "id" });
like.belongsTo(content, { foreignKey: "contentId", targetKey: "id" });
comment.hasMany(like, { foreignKey: "commentId", sourceKey: "id" });
like.belongsTo(comment, { foreignKey: "commentId", targetKey: "id" });
user.hasMany(like, { foreignKey: "userId", sourceKey: "id" });
like.belongsTo(user, { foreignKey: "userId", targetKey: "id" });
user.hasMany(image, { foreignKey: "userId", sourceKey: "id" });
image.belongsTo(user, { foreignKey: "userId", targetKey: "id" });
content.hasMany(image, { foreignKey: "contentId", sourceKey: "id" });
image.belongsTo(content, { foreignKey: "contentId", targetKey: "id" });
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
