// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/ccna_quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
  explanation: String
});

const Question = mongoose.model('Question', QuestionSchema);

app.get('/questions', async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 10 } }]);
  res.json(questions);
});

app.post('/questions', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));


