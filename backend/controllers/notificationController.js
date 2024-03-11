const mongoose = require("mongoose");
const notification = require("../models/notificationModel");

const invalid_Id = "Invalid Id";
// post new notification
const postNotifications = async (req, res) => {
  try {
    const { message, read } = req.body;
    const notif = await notification.create({
      message: message,
      read: read,
    });
    return res.status(200).json({ Message: "Data inserted", notif });
  } catch (error) {
    return res.status(404).json({ Message: "Data not inserted successfully" });
  }
};

//get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notif = await notification.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ Message: "Data Fetch", notif });
  } catch (error) {
    return res.status(404).json({ Message: "Data not found" });
  }
};

//get specific notification
const getNotification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(invalid_Id);
  }

  const notif = await notification.findById({ _id: id });
  if (!notif) {
    return res.status(404).json({ Message: "Data not found", notif });
  }

  return res.status(200).json({ Message: "Data Found", notif });
};

//Delete notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(invalid_Id);
  }

  const notif = await notification.findByIdAndDelete({ _id: id });

  if (!notif) {
    return res.status(404).json({ Message: "Data not deleted" });
  }

  return res.status(200).json({ Message: "Data Deleted Successfully", notif });
};

//Update notification
const updateNotification = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(invalid_Id);
  }
  const notif = await notification.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!notif) {
    return res.status(404).json({ Message: "Data not Updated" });
  }
  return res.status(200).json({ Message: "Data Updated Successfully", notif });
};

module.exports = {
  postNotifications,
  getAllNotifications,
  getNotification,
  deleteNotification,
  updateNotification,
};
