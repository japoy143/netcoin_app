const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifications = new Schema(
  {
    message: {
      type: [],
      required: true,
    },
    read: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", notifications);
