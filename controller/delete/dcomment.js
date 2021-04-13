const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  delete: async (req, res) => {
    const { commentId } = req.query;
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      await comment
        .destroy({
          where: { id: commentId },
        })
        .then(() => {
          return res.status(201).send({ message: "deleted comment successfully" });
        })
        .catch((err) => {
          res.status(500).send("err");
        });
    }
  },
};
