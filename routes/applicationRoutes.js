const express = require("express");
const {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus
} = require("../controllers/applicationController");

const router = express.Router();

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/", createApplication);
router.patch("/:id/status", updateApplicationStatus);

module.exports = router;