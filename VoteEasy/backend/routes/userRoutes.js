const express = require("express");
const { authUser, registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/", registerUser);

module.exports = router;
