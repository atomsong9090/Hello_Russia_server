const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./models").sequelize;
const postApi = require("./controller/post");
const getApi = require("./controller/get");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "abc-nation-imgs",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
  }),
  limits: { fieldSize: 5 * 1024 * 1024 },
});

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

app.post("/image", upload.array("imgs", 3), function (req, res) {
  //sort(file.originalname) 한번 하고, foreach() 돌리기전에
  const files = req.files;
  res.status(200).send(files);
});

app.post("/signin", postApi.signin.post);
app.post("/signup", postApi.signup.post);
app.post("/signout", postApi.signout.post);
app.post("/content", postApi.content.post);
app.post("/comment", postApi.comment.post);
app.get("/contents", getApi.contents.get);
app.get("/comments", getApi.comments.get);
app.get("/likescontents", getApi.likescontents.get);
app.get("/mycontents", getApi.mycontents.get);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});

module.exports.app = app;
