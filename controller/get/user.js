const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  //TODO: 로그인 로직 작성
  get: async (req, res) => {
    const accessTokenData = isAuthorized(req);

    const userInfo = await user.findOne({
      where: { id: accessTokenData.id },
    });

    if (!userInfo) {
      res.status(400).send("not authorized");
    } else if (userInfo) {
      delete userInfo.dataValues.password;
      res.status(200).send({ message: "ok", data: userInfo.dataValues });
    } else {
      return res.status(500).send("err");
    }
  },
};
