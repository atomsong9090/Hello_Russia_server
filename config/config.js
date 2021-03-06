require("dotenv").config();

const development = {
  username: process.env.database_admin,
  password: process.env.database_password,
  database: "test",
  host: process.env.database_host,
  dialect: "mysql",
  port: process.env.database_port,
};

const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};

const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, test, production };
