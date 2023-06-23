const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.json({ message: "User already exists" });
    } else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        password: hashedPassword,
        role,
      });
      newUser
        .save()
        .then((savedUser) => {
          res.status(201).json(savedUser);
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to add User" });
        });
    }
  } catch (error) {
    res.json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.json("User is not registered");
    }
    if (existingUser && role != existingUser.role) {
      res.json("The roles do not match");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
      const expiresIn = "1h";
      const payload = {
        username: existingUser.username,
        role: existingUser.role,
      };
      const token = jwt.sign(payload, "Balaji", {
        expiresIn,
      });
      const data = {
        message: "Authentication Successful",
        token,
      };
      res.status(200).json(data);
    } else {
      res.status(401).json("Wrong Credentials");
    }
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  register,
  login,
};
