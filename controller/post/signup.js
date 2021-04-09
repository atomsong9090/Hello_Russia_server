const { user } = require("../../models");
const crypto = require("crypto");
require("dotenv").config();

module.exports = {
  post: async (req, res) => {
    const { email, nickname, password } = req.body;

    const encrypted = crypto.pbkdf2Sync(password, process.env.DATABASE_SALT, 103018, 64, "sha512").toString("base64");

    await user
      .findOrCreate({
        where: { email: email },
        defaults: {
          nickname: nickname,
          password: encrypted,
          email: email,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send("email already exists");
        }
        res.status(201).send("created successfully");
      })
      .catch((err) => {
        res.status(500).send("err");
      });

    return res.send("signup");
  },
};
