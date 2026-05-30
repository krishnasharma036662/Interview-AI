const mongoose = require('mongoose');
const { match } = require('node:assert');

/** 
 * - job description
 * resume text
 * self description
 * 
 * AI:
 * -technical skills :
 *  [{
 * question:"",
 * intention:"",
 * answer:""
 * }]
 * -behavorial skills : [{
 * question:"",
 * intention:"",
 * answer:""
 * }]
 * -skill gap  :
 *  [{
 * skill:"",
 * severity:{
 *  type: String,
 *  enum: ["low", "medium", "high"]
 * },
 * }]
 * -prepration tips : [{
 * day:"",
 * focus:"",
 * tasks:"",
 * tip:"",
 * }]
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
 }, {_id: false
})
const behavioralQuestionsSchema = new mongoose.Schema({
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
 }, {_id: false
})
const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    }
}, {_id: false
})
const preparationTipSchema = new mongoose.Schema({
    day: { type: String, required: true },
    focus: { type: String, required: true },
    tasks: { type: String, required: true },
    tip: { type: String, required: true },
}, {_id: false })
const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: true },
    resumeText: { type: String },
    selfDescription: { type: String, required: true },
    matchscore: { type: Number,min:0, required: true },
    technicalSkills: [technicalQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationTips: [preparationTipSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
 
    },title:{
        type: String,
        required: true
    }
}, { timestamps: true })

const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);
module.exports = InterviewReport;   
