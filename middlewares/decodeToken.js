const jwt = require("jsonwebtoken");

const decodeToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (auth == null || auth == undefined) {
      res.json("Token not present");
    }
    const decodedToken = jwt.decode(auth, "Balaji");
    req.role = decodedToken.role;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = decodeToken;
