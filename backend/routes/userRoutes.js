const express = require("express");
const {
  addUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const route = express.Router();

//add user
route.post("/", addUser);

//get users
route.get("/", getUsers);

//get user
route.get("/:id", getUser);

//delete user
route.delete("/:id", deleteUser);

//update user
route.patch("/:id", updateUser);

module.exports = route;
