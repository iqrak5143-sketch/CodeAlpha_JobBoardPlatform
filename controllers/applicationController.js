const JobApplication = require("../models/JobApplication");
const JobListing = require("../models/JobListing");
const Candidate = require("../models/Candidate");
const Resume = require("../models/Resume");

const createApplication = async (req, res) => {
    try {
        const {
            job,
            candidate,
            resume,
            coverLetter
        } = req.body;

        const existingJob = await JobListing.findById(job);

        if (!existingJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (!existingJob.isActive) {
            return res.status(400).json({
                success: false,
                message: "This job is no longer active"
            });
        }

        const existingCandidate = await Candidate.findById(candidate);

        if (!existingCandidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found"
            });
        }

        const existingResume = await Resume.findOne({
            _id: resume,
            candidate
        });

        if (!existingResume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found for this candidate"
            });
        }

        const existingApplication = await JobApplication.findOne({
            job,
            candidate
        });

        if (existingApplication) {
            return res.status(409).json({
                success: false,
                message: "Candidate has already applied for this job"
            });
        }

        const application = await JobApplication.create({
            job,
            candidate,
            resume,
            coverLetter
        });

        const savedApplication = await JobApplication.findById(
            application._id
        )
            .populate("job")
            .populate("candidate")
            .populate("resume");

        res.status(201).json({
            success: true,
            message: "Job application submitted successfully",
            data: savedApplication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to submit job application",
            error: error.message
        });
    }
};

const getApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find()
            .populate("job")
            .populate("candidate")
            .populate("resume")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch applications",
            error: error.message
        });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id)
            .populate("job")
            .populate("candidate")
            .populate("resume");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch application",
            error: error.message
        });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "applied",
            "shortlisted",
            "interview",
            "selected",
            "rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status"
            });
        }

        const application = await JobApplication.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        )
            .populate("job")
            .populate("candidate")
            .populate("resume");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            data: application
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update application status",
            error: error.message
        });
    }
};

module.exports = {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus
};