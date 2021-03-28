const cors = require("cors");
const express = require("express");

const app = express();
app.set("port", 4000);
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET,POST", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

module.exports.app = app;
