const pdfparse = require('pdf-parse');
const {GenerateinterviewReport} = require('../services/ai.service');
const InterviewReport = require('../models/interviewReport.mmodel');
async function generateInterviewReport(req, res) {
    const resumeFile= req.file;
    const resumeContent = await (new pdfparse.PDFParse(new Uint8Array(resumeFile.buffer))).getText();
    const {selfDescription, jobDescription} = req.body;

    const interviewReport = await GenerateinterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    });

    const interviewReportDoc = new InterviewReport({
        user:req.user._id,
        resumeText: resumeContent.text,
        selfDescription,
        jobDescription,
    });
    await interviewReportDoc.save();
    res.status(200).json({ message: 'Interview report generated successfully', interviewReport });
}

module.exports = {
    generateInterviewReport
};