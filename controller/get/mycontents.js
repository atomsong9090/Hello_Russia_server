const { user, content, like, image } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    const userId = accessTokenData.id;

    const mycontents = await content.findAndCountAll({
      include: [{ model: user, attribute: ["nickname"] }, { model: like }, { model: image }],
      where: { userId: userId },
    });
    if (mycontents.count > 0) {
      return res.status(200).send({ data: mycontents, message: "ok" });
    } else if (mycontents.count === 0) {
      return res.status(400).send("cannot find user's contents");
    }
    return res.status(500).send("err");
  },
};
