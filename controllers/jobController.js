const JobListing = require("../models/JobListing");
const Employer = require("../models/Employer");

const getJobs = async (req, res) => {
    try {
        const {
            keyword,
            location,
            jobType,
            experienceLevel
        } = req.query;

        const filter = {
            isActive: true
        };

        if (keyword) {
            filter.$or = [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    skills: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ];
        }

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (jobType) {
            filter.jobType = jobType;
        }

        if (experienceLevel) {
            filter.experienceLevel = experienceLevel;
        }

        const jobs = await JobListing.find(filter)
            .populate("employer")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await JobListing.findById(req.params.id)
            .populate("employer");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch job",
            error: error.message
        });
    }
};

const createJob = async (req, res) => {
    try {
        const {
            employer,
            title,
            description,
            location,
            jobType,
            experienceLevel,
            salaryMin,
            salaryMax,
            skills
        } = req.body;

        const existingEmployer = await Employer.findById(employer);

        if (!existingEmployer) {
            return res.status(404).json({
                success: false,
                message: "Employer not found"
            });
        }

        if (
            salaryMin !== undefined &&
            salaryMax !== undefined &&
            salaryMin > salaryMax
        ) {
            return res.status(400).json({
                success: false,
                message: "Minimum salary cannot be greater than maximum salary"
            });
        }

        const job = await JobListing.create({
            employer,
            title,
            description,
            location,
            jobType,
            experienceLevel,
            salaryMin,
            salaryMax,
            skills
        });

        const savedJob = await JobListing.findById(job._id)
            .populate("employer");

        res.status(201).json({
            success: true,
            message: "Job posted successfully",
            data: savedJob
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create job",
            error: error.message
        });
    }
};

module.exports = {
    getJobs,
    getJobById,
    createJob
};