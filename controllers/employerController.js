const Employer = require("../models/Employer");

const getEmployers = async (req, res) => {
    try {
        const employers = await Employer.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: employers.length,
            data: employers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch employers",
            error: error.message
        });
    }
};

const getEmployerById = async (req, res) => {
    try {
        const employer = await Employer.findById(req.params.id);

        if (!employer) {
            return res.status(404).json({
                success: false,
                message: "Employer not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch employer",
            error: error.message
        });
    }
};

const createEmployer = async (req, res) => {
    try {
        const {
            companyName,
            contactPerson,
            email,
            phone,
            companyDescription,
            website
        } = req.body;

        const existingEmployer = await Employer.findOne({
            email
        });

        if (existingEmployer) {
            return res.status(409).json({
                success: false,
                message: "Employer with this email already exists"
            });
        }

        const employer = await Employer.create({
            companyName,
            contactPerson,
            email,
            phone,
            companyDescription,
            website
        });

        res.status(201).json({
            success: true,
            message: "Employer created successfully",
            data: employer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create employer",
            error: error.message
        });
    }
};

module.exports = {
    getEmployers,
    getEmployerById,
    createEmployer
};