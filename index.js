const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./app/routes/authRoutes");
const menteeRoutes = require("./app/routes/menteeRoutes");
const mentorRoutes = require("./app/routes/mentorRoutes");
const managerRoutes = require("./app/routes/managerRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log(`Error connecting to database : ${err}`);
  });

app.use("/auth", authRoutes);
app.use("/mentee", menteeRoutes);
app.use("/mentor", mentorRoutes);
app.use("/manager", managerRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
