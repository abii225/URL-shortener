const express = require("express");
const app = express();
const shortUrl = require("node-short-url-normal");
const jwt = require("jsonwebtoken");
const data = require("./DB/db");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
const port = 8080;

app.get("/", (req, res) => {
  console.log(data);
  res.status(200).send("homepage");
});

app.post("/URL/:url", (req, res) => {
  try {
    const { url } = req.params;
    console.log(url);
    shortUrl(`${url}`).then((data) => {
      let shortener = data.split("/");
      console.log(shortener);
      let shortUrl = shortener[shortener.length - 1];
      var token = jwt.sign(
        { url: url, customURL: shortUrl },
        `${process.env.KEY}`
      );
      // data.push({url:url,customURL:shortUrl})
      return res.status(200).json({ message: "Success", url: shortUrl });
    });
  } catch (err) {
    res.status(500).json({ message: "failed", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  console.log("server is running....");
});
