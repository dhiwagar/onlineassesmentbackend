const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionId:{
        type: String,
        required: true,
        unique:true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['MCQ', 'MATCHING', 'REORDERING', 'IMAGE', 'AUDIO_VIDEO']
    },
    answers: {
        type: String,
        required: true,
        
    },
    choices:{
        type: [String],
       
        required: true,
    },
   
   
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
