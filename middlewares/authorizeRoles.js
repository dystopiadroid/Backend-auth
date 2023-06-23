function authorizeRoles(allowedRoles) {
  return function (req, res, next) {
    try {
      if (!allowedRoles.includes(req.role)) {
        res.status(401).json({ message: "Unauthorized access" });
      }
      next();
    } catch (err) {
      res.json({ err });
    }
  };
}

module.exports = authorizeRoles;
