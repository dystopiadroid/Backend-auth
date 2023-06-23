const menteeController = (req, res) => {
  res.json({ role: req.role });
};

module.exports = menteeController;
