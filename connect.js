const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/shortUrl", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
