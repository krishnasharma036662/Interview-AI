require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database.js');
const {resume,selfDescription,jobDescription} = require('./src/services/temp.js');
const generateInterviewReport = require('./src/services/ai.service.js');


connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});