const express = require("express");
const router = express.Router();
const {
    authCandidate,
    registerCandidate,
} = require("../controllers/voteControllers");

router.post("/", registerCandidate);

module.exports = router;
