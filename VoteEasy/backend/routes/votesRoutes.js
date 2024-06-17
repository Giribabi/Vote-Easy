const express = require("express");
const router = express.Router();
const { castVote } = require("../controllers/voteControllers");

router.post("/", castVote);

module.exports = router;
