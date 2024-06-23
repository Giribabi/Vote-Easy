const express = require("express");
const router = express.Router();
const {
    registerCandidate,
    getCandidatesList,
} = require("../controllers/candidateControllers");

router.post("/", registerCandidate);
router.get("/list", getCandidatesList);

module.exports = router;
