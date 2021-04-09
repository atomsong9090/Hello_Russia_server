const { content, like, image } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { category } = req.body;
    const contents = await content.findAndCountAll({
      include: [
        {
          model: like,
        },
        {
          model: image,
        },
      ],
      where: { category: category },
      order: ["createdAt"],
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
