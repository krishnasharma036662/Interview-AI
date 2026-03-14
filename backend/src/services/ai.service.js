const {GoogleGenAI} = require('@google/genai');
const {z} = require('zod');
const {zodToJsonSchema} = require('zod-to-json-schema');
const { be } = require('zod/v4/locales');

const  ai = new GoogleGenAI({
    apikey: process.env.GEMINI_API_KEY
});

const interviewReportSchema = z.object({
    technicalQuestions:z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention of the question"),
        expectedAnswer: z.string().describe("The expected answer to the question"),
    })).describe("A list of technical questions asked during the interview"),
    behavioralQuestions:z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention of the question"),
        expectedAnswer: z.string().describe("The expected answer to the question"),
    })).describe("A list of behavioral questions asked during the interview"),
    skillgap: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        importance: z.string().describe("The importance of the skill for the job"),
        recommendation: z.string().describe("Recommendations for improving the skill"),
    })).describe("A list of skill gaps identified during the interview"),
    preprationplan: z.array(z.object({
        topic: z.string().describe("The topic that the candidate should focus on for preparation"),
        resources: z.string().describe("Recommended resources for learning the topic"),
    })).describe("A list of preparation topics and resources for the candidate")

});

async function GenerateinterviewReport(resume, selfDescription, jobDescription) {
    const prompt = `Generate an interview report based on the following resume, self-description, and job description. The report should include an analysis of the candidate's strengths, weaknesses, and suitability for the job.

Resume:
${resume}

Self-Description:
${selfDescription}

Job Description:
${jobDescription}
`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config:{
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(interviewReportSchema)
        },
    });
  return JSON.parse(response.text);
  
}

async function invokeGeminiAI() {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents:"Hello gemini! Explain what is interview?"
    });
}
module.exports = {
    invokeGeminiAI
};