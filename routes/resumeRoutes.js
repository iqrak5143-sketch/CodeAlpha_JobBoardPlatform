const express = require("express");
const upload = require("../middleware/upload");
const {
    uploadResume,
    getCandidateResumes
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/candidate/:candidateId", getCandidateResumes);

module.exports = router;