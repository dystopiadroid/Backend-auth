const managerController = (req, res) => {
  res.json({ role: req.role });
};

module.exports = managerController;
