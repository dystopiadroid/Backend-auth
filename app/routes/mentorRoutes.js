const express = require("express");
const router = express.Router();
const decodeToken = require("../middlewares/decodeToken");
const mentorController = require("../controllers/mentorController");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.get("/home", decodeToken, authorizeRoles(["mentor"]), mentorController);
module.exports = router;
