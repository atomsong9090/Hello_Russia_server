const cors = require("cors");
const express = require("express");
const content = require("./controller/post");
const sequelize = require("./models").sequelize;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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
app.post("/signin", content.signin.post);
app.post("/signup", content.signup.post);
app.post("/signout", content.signout.post);
app.post("/content", content.content.post);
app.post("/comment", content.comment.post);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

module.exports.app = app;
