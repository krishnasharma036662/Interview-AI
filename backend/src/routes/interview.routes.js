const express = require('express');
const  authMiddleware  = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');

const InterviewRouter = express.Router();

/**
 * @route   POST /api/interview/generate
 * @description Generate an interview report based on the candidate's resume, self-description, and job description
 * @access  Public
 */

InterviewRouter.post('/generate',authMiddleware.authuser,upload.single("file"),interviewController.generateInterviewReport);
module.exports = InterviewRouter;
