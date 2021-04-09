const { user, comment } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const { contentId } = req.body;
    const comments = await comment.findAndCountAll({
      include: [{ model: user, attributes: ["nickname"] }],
      where: { contentId: contentId },
      order: ["createdAt"],
    });
    if (comments.count > 0) {
      return res.status(200).send(comments);
    } else if (comments.count === 0) {
      return res.status(400).send("cannot find comments");
    }
    return res.status(500).send("err");
  },
};
