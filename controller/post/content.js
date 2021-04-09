const { content } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  post: async (req, res) => {
    const { category, text, title } = req.body;
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      await content
        .create({
          title: title,
          text: text,
          category: category,
          userId: accessTokenData.id,
        })
        .then((data) => {
          return res.status(201).send({ data: data, message: "created new content successfully" });
        })
        .catch((err) => {
          res.status(500).send("err");
        });
    }
  },
};
