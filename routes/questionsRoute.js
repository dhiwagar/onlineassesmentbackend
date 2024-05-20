const express = require('express');
const router = express.Router();
const questionController = require('../controller/questioncontroller');

// Routes for question operations
router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);
router.get('/:questionId', questionController.getQuestionById);
router.put('/questions/:id', questionController.updateQuestionById);
router.delete('/questions/:id', questionController.deleteQuestionById);

module.exports = router;
