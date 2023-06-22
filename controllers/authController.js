const User = require("../models/User");
const bcrypt = require("bcrypt");

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

module.exports = register;
