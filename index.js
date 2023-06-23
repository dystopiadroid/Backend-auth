const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const menteeRoutes = require("./routes/menteeRoutes");
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

app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
