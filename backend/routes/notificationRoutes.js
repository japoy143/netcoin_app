const express = require("express");
const route = express.Router();
const {
  postNotifications,
  getAllNotifications,
  getNotification,
  deleteNotification,
  updateNotification,
} = require("../controllers/notificationController");

//post notification
route.post("/", postNotifications);

//get all notifications
route.get("/", getAllNotifications);

//get specific notifications
route.get("/:id", getNotification);

//delete
route.delete("/:id", deleteNotification);

//update notification
route.patch("/:id", updateNotification);

module.exports = route;
