const Answer = require('../models/answerSchema');
const Question = require('../models/questionSchema'); // Assuming you have a Question model

// Create a new answer
exports.createAnswer = async (req, res) => {
    const { questionId, userId, chosenAnswer } = req.body;

    try {
        // Validate if questionId exists
        const question = await Question.findOne({questionId: questionId});
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const answer = new Answer({
            questionId,
            userId,
            chosenAnswer
        });

        // Determine if the chosen answer is correct
        if (chosenAnswer === question.answers) {
            answer.isCorrect = true;
        }
        if(answer.isCorrect == true){
            await answer.save();
            res.status(201).json({ message: 'correct answer', answer });
        }
        await answer.save();
        res.status(201).json({message:'wrong answer', answer});
      
    } catch (error) {
        
        console.error('Error creating answer:', error);
        res.status(500).json({ error: 'Failed to create answer' });
    }
};

// Get all answers
exports.getAllAnswers = async (req, res) => {
    try {
        const answers = await Answer.find();
        res.json(answers);
    } catch (error) {
        console.error('Error getting answers:', error);
        res.status(500).json({ error: 'Failed to get answers' });
    }
};

// Get answers by user ID
exports.getAnswersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const answers = await Answer.find({ userId });
        res.json(answers);
    } catch (error) {
        console.error('Error getting answers by user ID:', error);
        res.status(500).json({ error: 'Failed to get answers by user ID' });
    }
};

// Get answers by question ID
exports.getAnswersByQuestionId = async (req, res) => {
    const { questionId } = req.params;

    try {
        const answers = await Answer.find({ questionId });
        res.json(answers);
    } catch (error) {
        console.error('Error getting answers by question ID:', error);
        res.status(500).json({ error: 'Failed to get answers by question ID' });
    }
};

// Update an answer by ID
exports.updateAnswerById = async (req, res) => {
    const { id } = req.params;
    const { chosenAnswer } = req.body;

    try {
        const answer = await Answer.findByIdAndUpdate(id, { chosenAnswer }, { new: true });
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        // Update isCorrect based on the new chosenAnswer (assuming the question is fetched to compare)
        // For simplicity, update isCorrect logic needs to be implemented here

        res.json({ message: 'Answer updated successfully', answer });
    } catch (error) {
        console.error('Error updating answer:', error);
        res.status(500).json({ error: 'Failed to update answer' });
    }
};

// Delete an answer by ID
exports.deleteAnswerById = async (req, res) => {
    const { id } = req.params;

    try {
        const answer = await Answer.findByIdAndDelete(id);
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        res.json({ message: 'Answer deleted successfully' });
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ error: 'Failed to delete answer' });
    }
};
