const express = require("express");
const {
    getCandidates,
    getCandidateById,
    createCandidate
} = require("../controllers/candidateController");

const router = express.Router();

router.get("/", getCandidates);
router.get("/:id", getCandidateById);
router.post("/", createCandidate);

module.exports = router;