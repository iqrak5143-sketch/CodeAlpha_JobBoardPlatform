const mongoose = require("mongoose");

const jobListingSchema = new mongoose.Schema(
    {
        employer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        jobType: {
            type: String,
            enum: ["full-time", "part-time", "internship", "contract", "remote"],
            required: true
        },

        experienceLevel: {
            type: String,
            enum: ["entry-level", "mid-level", "senior-level"],
            required: true
        },

        salaryMin: {
            type: Number,
            min: 0
        },

        salaryMax: {
            type: Number,
            min: 0
        },

        skills: {
            type: [String],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("JobListing", jobListingSchema);