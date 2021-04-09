const { like, content, user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  get: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    const userId = accessTokenData.id;

    const contents = await content.findAndCountAll({
      include: [{ model: like, where: { userId: userId } }, { model: user }],
    });

    res.send(contents);
  },
};
