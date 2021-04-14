const { user } = require("../../models");
const crypto = require("crypto");
const { isAuthorized } = require("../tokenFunctions");

require("dotenv").config();

module.exports = {
  patch: async (req, res) => {
    const accessTokenData = isAuthorized(req);

    const { nickname, password, newPassword, country, avatarUrl } = req.body;

    if (password && newPassword) {
      const encrypted = crypto
        .pbkdf2Sync(password, process.env.DATABASE_SALT, Number(process.env.DATABASE_SALT_CYCLE), 64, "sha512")
        .toString("base64");

      const newEncrypted = crypto
        .pbkdf2Sync(newPassword, process.env.DATABASE_SALT, Number(process.env.DATABASE_SALT_CYCLE), 64, "sha512")
        .toString("base64");

      await user
        .update(
          { password: newEncrypted },
          {
            where: { password: encrypted },
          }
        )
        .catch((err) => {
          return res.status(400).send(err);
        });
    }

    if (nickname) {
      await user.update(
        {
          nickname: nickname,
        },
        { where: { id: accessTokenData.id } }
      );
    }
    if (country) {
      await user.update(
        {
          country: country,
        },
        { where: { id: accessTokenData.id } }
      );
    }
    if (avatarUrl) {
      await user.update(
        {
          avatarUrl: avatarUrl,
        },
        { where: { id: accessTokenData.id } }
      );
    }

    res.status(201).send("ok");
  },
};
