const { isAuthorized } = require("../tokenFunctions");
const { content, like, image, user, comment } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    const { contentId, commentId } = req.body;

    const likecontent = like.findOne({
      where: { userId: accessTokenData.id },
    });
    if (!likecontent && contentId) {
      like.create({
        userId: accessTokenData.id,
        contentId: contentId,
      });
    }

    const contents = await content
      .findAndCountAll({
        include: [
          {
            model: user,
            attributes: ["id", "nickname", "country", "avatarUrl"],
          },
          {
            model: like,
          },
          {
            model: image,
          },

          {
            model: comment,
          },
        ],
        where: { userid: accessTokenData.id },
        order: ["createdAt"],
      })
      .catch((err) => {
        return res.send("err");
      });

    if (contents.rows.length > 0) {
      return res.status(200).send({
        data: contents.rows,
        message: "ok",
      });
    } else if (contents.rows.length === 0) {
      return res.status(400).send("cannot find contents");
    }

    return res.status(500).send("err");
  },
};
