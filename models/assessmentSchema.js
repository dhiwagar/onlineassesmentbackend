const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
        required: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
