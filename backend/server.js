const express = require("express");
require("dotenv").config();
require("colors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method, req.params);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`.blue));
    console.log(`DB Successfully connected`.blue);
  })
  .catch(() => console.log(`DB connection failed`.red));

const route = require("./routes/userRoutes");

app.use("/users/login", route);
