const mongoose = require("mongoose");
const shortUrlSchema = new mongoose.Schema(
  {
    redirectUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const shortUrl = mongoose.model("shortUrl", shortUrlSchema);
module.exports = shortUrl;
