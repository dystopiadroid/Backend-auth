const mentorController = (req, res) => {
  res.json({ role: req.role });
};

module.exports = mentorController;
