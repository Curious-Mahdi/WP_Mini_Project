const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    enum: ['html', 'css', 'js', 'react', 'node']
  },
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flashcard', flashcardSchema);

