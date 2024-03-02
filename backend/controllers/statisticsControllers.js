const mongoose = require("mongoose");
const stat = require("../models/statisticsModel");

// post the cypto price Today
const postCurrentCryptoPrice = async (req, res) => {
  const { price, dayIndex, day, done } = req.body;

  try {
    const stats = await stat.create({
      price: price,
      dayIndex: dayIndex,
      day: day,
      done: done,
    });
    return res
      .status(200)
      .json({ message: "Data inserted successfully", stats });
  } catch (error) {
    return res.status(404).json({ message: "Data not inserted successfully" });
  }
};
// get the crypto price
const getAllCurrentCryptoPrice = async (req, res) => {
  try {
    const stats = await stat.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ message: "Data fetch", stats });
  } catch (error) {
    return res.status(404).json({ message: "Data not found" });
  }
};

//get  all cryto price
const getCurrentCryptoPrice = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Not valid Id" });
  }
  const stats = await stat.findById(id);

  if (!stats) {
    return res.status(404).json({ message: "Data not found" });
  }

  return res.status(200).json({ message: "Data Fetch Successfully", stats });
};
// delete crypto price data
const deleteCurrentCryptoPrice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid Id" });
  }

  const stats = await stat.findByIdAndDelete({ _id: id });

  if (!stats) {
    return res.status(404).json({ message: "Data not deleted" });
  }

  return res.status(200).json({ message: "Data Deleted Successfully", stats });
};
// update crypto price dat
const updateCurrentCryptoPrice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid Id" });
  }

  const stats = await stat.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!stats) {
    return res.status(404).json({ message: "Data not Updated" });
  }

  return res.status(200).json({ message: "Data Updated", stats });
};

module.exports = {
  postCurrentCryptoPrice,
  getAllCurrentCryptoPrice,
  getCurrentCryptoPrice,
  updateCurrentCryptoPrice,
  deleteCurrentCryptoPrice,
};
