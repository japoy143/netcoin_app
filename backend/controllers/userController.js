const mongoose = require("mongoose");

const users = require("../models/userModel");
//create User
const addUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.create({
      username: username,
      password: password,
    });

    return res
      .status(200)
      .json({ message: "Data Inserted Successfully", user });
  } catch (error) {
    return res.status(404).json({ message: "Data Insertion Failed" });
  }
};

//Fetch Users
const getUsers = async (req, res) => {
  try {
    const user = await users.find({}).sort({ createdAt: -1 });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: "Data Fetching Failed" });
  }
};

//Get user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  const user = await users.findById(id);

  if (!user) {
    return res.status(404).json({ message: "Data not Found" });
  }

  return res.status(200).json({ message: "Data Found", user });
};

//Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  const user = await users.findByIdAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ message: "Data Not Deleted" });
  }

  return res.status(200).json({ message: "Data Deleted Successfully", user });
};

//Update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }
  const user = await users.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(404).json({ message: "Data Not Updated" });
  }

  return res.status(200).json({ message: "Data Updated Successfully", user });
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
