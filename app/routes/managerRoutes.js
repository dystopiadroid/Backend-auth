const express = require("express");
const router = express.Router();
const decodeToken = require("../middlewares/decodeToken");
const managerController = require("../controllers/managerController");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get(
  "/home",
  decodeToken,
  authorizeRoles(["manager"]),
  managerController
);
module.exports = router;
