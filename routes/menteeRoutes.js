const express = require("express");
const router = express.Router();
const decodeToken = require("../middlewares/decodeToken");
const menteeController = require("../controllers/menteeController");
const authorizeRoles = require("../middlewares/authorizeRoles");

// router.use("/home", decodeToken);
router.get("/home", decodeToken, authorizeRoles(["mentee"]), menteeController);
module.exports = router;
