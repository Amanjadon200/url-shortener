const express = require("express");
const app = express();
app.use(express.json());
require("./connect.js");
const shortid = require("shortid");
const shortUrl = require("./models/shorturl.js");
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.post("/shortId", (req, res) => {
  if (req.body.url == null || req.body.url == "") {
    res.send("URL is required").status(400);
  }
  const shortId = shortid();
  shortUrl.create({ redirectUrl: req.body.url, shortUrl: shortId, clicks: 0 });
  res.status(200).json({
    message: "Short URL created successfully",
    shortUrl: `http://localhost:3000/${shortId}`,
  });
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const url = await shortUrl.findOneAndUpdate(
    { shortUrl: shortId },
    { $inc: { clicks: 1 } }
  );
  if (url == null) {
    return res.sendStatus(404);
  }
  res.redirect(url.redirectUrl);
});
