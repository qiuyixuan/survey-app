const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/augmend-health', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define MongoDB schema
const surveySchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  maritalStatus: String,
  otherMaritalStatus: String,
  seenTherapist: String,
  takingMedication: String,
  medications: [String],
});

const Survey = mongoose.model('Survey', surveySchema);

// Define API endpoint to handle survey submissions
app.post('/api/submit-survey', async (req, res) => {
  try {
    const surveyData = req.body;

    // Save survey data to MongoDB
    const survey = new Survey(surveyData);
    await survey.save();

    res.status(201).json({ message: 'Survey submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
