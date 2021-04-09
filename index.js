const cors = require("cors");
const express = require("express");
const content = require("./controller/post");
const sequelize = require("./models").sequelize;
const cookieParser = require("cookie-parser");

const app = express();
sequelize.sync({ force: true, alter: false });
app.use(express.json());
app.set("port", 4000);
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/signin", content.signin.post);
app.post("/signup", content.signup.post);
app.get("/signout", content.signout.post);
app.get("/content", content.content.post);
app.get("/comment", content.comment.post);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

module.exports.app = app;
