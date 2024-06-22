const express = require("express");
const { authUser, registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", authUser);

module.exports = router;
