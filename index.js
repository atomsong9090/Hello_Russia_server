const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const sequelize = require("./models").sequelize;
const postApi = require("./controller/post");
const getApi = require("./controller/get");

const app = express();
sequelize.sync({ force: false, alter: false });
app.use(express.json());
app.set("port", 4000);
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/signin", postApi.signin.post);
app.post("/signup", postApi.signup.post);
app.post("/signout", postApi.signout.post);
app.post("/content", postApi.content.post);
app.post("/comment", postApi.comment.post);
app.get("/contents", getApi.contents.get);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

module.exports.app = app;
