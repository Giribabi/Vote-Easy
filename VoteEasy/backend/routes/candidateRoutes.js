const express = require("express");
const router = express.Router();
const {
    authCandidate,
    registerCandidate,
} = require("../controllers/candidateControllers");

router.post("/", registerCandidate);

module.exports = router;
