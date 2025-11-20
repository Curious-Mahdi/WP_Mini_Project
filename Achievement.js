const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['first_quiz', 'perfect_score', 'all_modules', 'streak_7', 'streak_30', 'flashcard_master', 'quiz_master']
  },
  module: {
    type: String,
    enum: ['html', 'css', 'js', 'react', 'node', null],
    default: null
  },
  earnedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

achievementSchema.index({ userId: 1, type: 1, module: 1 }, { unique: true });

module.exports = mongoose.model('Achievement', achievementSchema);



