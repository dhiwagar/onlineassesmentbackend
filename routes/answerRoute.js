const express = require('express');
const router = express.Router();
const answerController = require('../controller/answerController');

router.post('/answers', answerController.createAnswer);
router.get('/answers', answerController.getAllAnswers);
router.get('/answers/user/:userId', answerController.getAnswersByUserId);
router.get('/answers/question/:questionId', answerController.getAnswersByQuestionId);
router.put('/answers/:id', answerController.updateAnswerById);
router.delete('/answers/:id', answerController.deleteAnswerById);

module.exports = router;
