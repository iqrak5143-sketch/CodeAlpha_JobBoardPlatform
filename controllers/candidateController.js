const Candidate = require("../models/Candidate");

const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch candidates",
            error: error.message
        });
    }
};

const getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        res.status(200).json({
            success: true,
            data: candidate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch candidate",
            error: error.message
        });
    }
};

const createCandidate = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            location,
            skills,
            education
        } = req.body;

        const existingCandidate = await Candidate.findOne({
            email
        });

        if (existingCandidate) {
            return res.status(409).json({
                success: false,
                message: "Candidate with this email already exists"
            });
        }

        const candidate = await Candidate.create({
            fullName,
            email,
            phone,
            location,
            skills,
            education
        });

        res.status(201).json({
            success: true,
            message: "Candidate created successfully",
            data: candidate
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create candidate",
            error: error.message
        });
    }
};

module.exports = {
    getCandidates,
    getCandidateById,
    createCandidate
};