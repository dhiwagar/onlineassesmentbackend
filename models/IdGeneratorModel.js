const mongoose = require('mongoose');

// const idGeneratorSchema = new mongoose.Schema({
//     entityType: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     lastId: {
//         type: Number,
//         required: true,
//         default: 0
//     }
// });

const idGeneratorSchema = new mongoose.Schema({
    entityType: {
      type: String,
      required: true,
      unique: true,
      // Add an index:
      index: true
    },
    lastId: {
      type: Number,
      required: true,
      default: 0
    }
  });
  

const IdGenerator = mongoose.model('IdGenerator', idGeneratorSchema);

module.exports = IdGenerator;