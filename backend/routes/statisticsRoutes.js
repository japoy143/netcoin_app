const express = require("express");
const route = express.Router();

const {
  postCurrentCryptoPrice,
  getAllCurrentCryptoPrice,
  getCurrentCryptoPrice,
  deleteCurrentCryptoPrice,
  updateCurrentCryptoPrice,
} = require("../controllers/statisticsControllers");

//create data or post
route.post("/", postCurrentCryptoPrice);
// get all data
route.get("/", getAllCurrentCryptoPrice);
//get specific data
route.get("/:id", getCurrentCryptoPrice);
// delete datac
route.delete("/:id", deleteCurrentCryptoPrice);
// update data
route.patch("/:id", updateCurrentCryptoPrice);

module.exports = route;
