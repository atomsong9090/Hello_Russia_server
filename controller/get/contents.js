const { content, like, image, user, comment } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { category } = req.query;
    console.log(req.query);
    const contents = await content
      .findAndCountAll({
        include: [
          {
            model: like,
          },
          {
            model: image,
          },
          {
            model: user,
            attributes: ["nickname", "country", "avatarUrl"],
          },
          {
            model: comment,
          },
        ],
        where: { category: category },
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
