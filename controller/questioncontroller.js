const Question = require('../models/questionSchema');
const { generateUniqueIdWithPrefix } = require('../utlis/idGenerator');
const _ = require('lodash');
// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const questionId = await generateUniqueIdWithPrefix('QUES');
    const { text, type, answers,choices  } = req.body;
    const newQuestion = new Question({
      text,
      type,
      answers,
      choices,
      questionId,
     
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    
    const questions = await Question.find();
    const shuffledQuestions = _.shuffle(questions);
    res.json(shuffledQuestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  const questionId  = req.params.questionId;
  
  try {
    const question = await Question.findOne({questionId: questionId});
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve question' });
  }
};

// Update a question by ID
exports.updateQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
};

// Delete a question by ID
exports.deleteQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};
