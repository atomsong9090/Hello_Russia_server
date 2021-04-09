const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  post: async (req, res) => {
    const { text, contentId } = req.body;
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      await comment
        .create({
          contentId: contentId,
          text: text,
          userId: accessTokenData.id,
        })
        .then((data) => {
          return res.status(201).send({ data: data, message: "created new comment successfully" });
        })
        .catch((err) => {
          res.status(500).send("err");
        });
    }
  },
};
