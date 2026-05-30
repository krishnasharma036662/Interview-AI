const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const interviewController = require('../controllers/interview.controller.js');
const upload = require('../middlewares/file.middleware.js');

const InterviewRouter = express.Router();

/**
 * @route   POST /api/interview/generate
 * @description Generate an interview report based on the candidate's resume, self-description, and job description
 * @access  Private
 */

InterviewRouter.post(
  '/generate',
  authMiddleware.auth,
  upload.single('file'),
  interviewController.generateInterviewReport
);

InterviewRouter.get(
  '/:id',
  authMiddleware.auth,
  interviewController.generateInterviewReportByIdController
);

module.exports = InterviewRouter;