const Resume = require("../models/Resume");
const Candidate = require("../models/Candidate");

const uploadResume = async (req, res) => {
    try {
        const { candidate } = req.body;

        if (!candidate) {
            return res.status(400).json({
                success: false,
                message: "Candidate ID is required"
            });
        }

        const existingCandidate = await Candidate.findById(candidate);

        if (!existingCandidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            });
        }

        const resume = await Resume.create({
            candidate,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype
        });

        res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            data: resume
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to upload resume",
            error: error.message
        });
    }
};

const getCandidateResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({
            candidate: req.params.candidateId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch resumes",
            error: error.message
        });
    }
};

module.exports = {
    uploadResume,
    getCandidateResumes
};