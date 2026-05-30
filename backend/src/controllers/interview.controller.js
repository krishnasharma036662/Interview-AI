const pdfparse = require('pdf-parse');
const { GenerateinterviewReport } = require('../services/ai.service');
const InterviewReport = require('../models/interviewReport.model');

async function generateInterviewReport(req, res) {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({
                message: 'Resume file is required'
            });
        }

        // Parse PDF correctly
        const pdfData = await pdfparse(resumeFile.buffer);

        const resumeContent = pdfData.text;

        const { selfDescription, jobDescription } = req.body;

        const interviewReport = await GenerateinterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        const interviewReportDoc = new InterviewReport({
            user: req.user.id,
            resumeText: resumeContent,
            selfDescription,
            jobDescription,
            interviewReport
        });

        await interviewReportDoc.save();

        res.status(200).json({
            message: 'Interview report generated successfully',
            interviewReport
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to generate interview report',
            error: error.message
        });
    }
}

async function generateInterviewReportByIdController(req, res) {
    try {
        const { id } = req.params;

        const interviewReport = await InterviewReport.findById(id);

        if (!interviewReport) {
            return res.status(404).json({
                message: 'Interview report not found'
            });
        }

        res.status(200).json({
            interviewReport
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to fetch interview report',
            error: error.message
        });
    }
}

async function getInterviewReportsController(req, res) {
    try {
        const userId = req.user._id;

        const reports = await InterviewReport.find({
            user: userId
        })
            .sort({ createdAt: -1 })
            .select(
                '-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillgap -preprationplan'
            );

        res.status(200).json({
            reports
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to fetch reports',
            error: error.message
        });
    }
}

module.exports = {
    generateInterviewReport,
    generateInterviewReportByIdController,
    getInterviewReportsController
};