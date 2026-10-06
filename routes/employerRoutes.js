const express = require("express");
const {
    getEmployers,
    getEmployerById,
    createEmployer
} = require("../controllers/employerController");

const router = express.Router();

router.get("/", getEmployers);
router.get("/:id", getEmployerById);
router.post("/", createEmployer);

module.exports = router;