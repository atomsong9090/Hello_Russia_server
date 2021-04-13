const { content } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  delete: async (req, res) => {
    const { contentId } = req.query;
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      await content
        .destroy({
          where: { id: contentId },
        })
        .then(() => {
          return res.status(201).send({ message: "deleted content successfully" });
        })
        .catch((err) => {
          res.status(500).send("err");
        });
    }
  },
};
