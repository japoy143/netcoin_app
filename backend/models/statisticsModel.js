const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const statistics = new Schema(
  {
    price: {
      type: [],
      required: true,
    },
    dayIndex: {
      type: Number,
      required: true,
      unique: true,
    },
    day: {
      type: String,
      unique: true,
    },
    done: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stats", statistics);
