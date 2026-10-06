const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobListing",
            required: true
        },

        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true
        },

        coverLetter: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "applied",
                "shortlisted",
                "interview",
                "selected",
                "rejected"
            ],
            default: "applied"
        }
    },
    {
        timestamps: true
    }
);

jobApplicationSchema.index(
    {
        job: 1,
        candidate: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);