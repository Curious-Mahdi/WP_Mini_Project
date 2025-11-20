const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    enum: ['html', 'css', 'js', 'react', 'node']
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length === 4;
      },
      message: 'Question must have exactly 4 options'
    }
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);

