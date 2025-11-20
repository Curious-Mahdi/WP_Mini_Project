const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const Question = require('../models/Question');
const User = require('../models/User');

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
};

// Modules page
router.get('/modules', requireAuth, (req, res) => {
  res.render('modules', { userName: req.session.userName });
});

// Flashcards page
router.get('/flashcards/:module', requireAuth, async (req, res) => {
  try {
    const { module } = req.params;
    if (!['html', 'css', 'js', 'react', 'node'].includes(module)) {
      return res.redirect('/learning/modules');
    }

    const flashcards = await Flashcard.find({ module }).sort({ order: 1 });
    res.render('flashcards', { 
      module, 
      flashcards,
      moduleName: module.toUpperCase()
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Quiz page
router.get('/quiz/:module', requireAuth, async (req, res) => {
  try {
    const { module } = req.params;
    if (!['html', 'css', 'js', 'react', 'node'].includes(module)) {
      return res.redirect('/learning/modules');
    }

    const questions = await Question.find({ module }).limit(10);
    if (questions.length < 10) {
      return res.render('quiz', {
        module,
        moduleName: module.toUpperCase(),
        questions: [],
        error: 'Not enough questions available. Please seed the database.'
      });
    }

    res.render('quiz', {
      module,
      moduleName: module.toUpperCase(),
      questions,
      error: null
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Quiz submission
router.post('/quiz/:module', requireAuth, async (req, res) => {
  try {
    const { module } = req.params;
    if (!['html', 'css', 'js', 'react', 'node'].includes(module)) {
      return res.redirect('/learning/modules');
    }

    const questions = await Question.find({ module }).limit(10);
    const answers = req.body.answers || {};
    
    let score = 0;
    const reviewData = [];
    
    questions.forEach((question, index) => {
      const userAnswer = parseInt(answers[`q${index}`]);
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) {
        score++;
      }
      
      reviewData.push({
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer,
        isCorrect: isCorrect
      });
    });

    // Store review data in session for review page
    req.session.quizReview = {
      module,
      questions: reviewData,
      score,
      total: questions.length
    };

    // Update user progress
    const user = await User.findById(req.session.userId);
    user.progress[module] = {
      score,
      completed: true
    };
    await user.save();

    res.redirect(`/learning/result/${module}?score=${score}&total=${questions.length}`);
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Result page
router.get('/result/:module', requireAuth, (req, res) => {
  const { module } = req.params;
  const score = parseInt(req.query.score) || 0;
  const total = parseInt(req.query.total) || 10;

  let message = '';
  if (score === total) {
    message = 'Perfect! You got everything right!';
  } else if (score >= total * 0.7) {
    message = 'Great job! You\'re doing well!';
  } else {
    message = 'Keep practicing! You\'ll get better!';
  }

  res.render('result', {
    module,
    moduleName: module.toUpperCase(),
    score,
    total,
    percentage: Math.round((score / total) * 100),
    message
  });
});

// Progress page
router.get('/progress', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render('progress', {
      userName: req.session.userName,
      progress: user.progress
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Review Answers page
router.get('/review/:module', requireAuth, (req, res) => {
  try {
    const { module } = req.params;
    const reviewData = req.session.quizReview;
    
    if (!reviewData || reviewData.module !== module) {
      return res.redirect(`/learning/result/${module}`);
    }
    
    res.render('review', {
      module,
      moduleName: module.toUpperCase(),
      questions: reviewData.questions,
      score: reviewData.score,
      total: reviewData.total
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Practice Mistakes page
router.get('/practice/:module', requireAuth, async (req, res) => {
  try {
    const { module } = req.params;
    if (!['html', 'css', 'js', 'react', 'node'].includes(module)) {
      return res.redirect('/learning/modules');
    }

    const user = await User.findById(req.session.userId);
    const reviewData = req.session.quizReview;
    
    // Get questions that were answered incorrectly
    let practiceQuestions = [];
    if (reviewData && reviewData.module === module) {
      const allQuestions = await Question.find({ module });
      reviewData.questions.forEach((reviewQ, index) => {
        if (!reviewQ.isCorrect) {
          const originalQ = allQuestions.find(q => 
            q.question === reviewQ.question || 
            JSON.stringify(q.options) === JSON.stringify(reviewQ.options)
          );
          if (originalQ) {
            practiceQuestions.push(originalQ);
          }
        }
      });
    }
    
    // If no mistakes, show random questions
    if (practiceQuestions.length === 0) {
      practiceQuestions = await Question.find({ module }).limit(5);
    }
    
    res.render('practice', {
      module,
      moduleName: module.toUpperCase(),
      questions: practiceQuestions.slice(0, 5),
      isPractice: true
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Achievements page
router.get('/achievements', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const modules = ['html', 'css', 'js', 'react', 'node'];
    
    let completedCount = 0;
    let perfectScores = 0;
    let totalScore = 0;
    
    modules.forEach(module => {
      if (user.progress[module] && user.progress[module].completed) {
        completedCount++;
        totalScore += user.progress[module].score || 0;
        if (user.progress[module].score === 10) {
          perfectScores++;
        }
      }
    });
    
    const achievements = [];
    
    // Check for achievements
    if (completedCount >= 1) {
      achievements.push({ type: 'first_quiz', name: 'First Steps', description: 'Completed your first quiz!', icon: '🎯', earned: true });
    }
    
    if (perfectScores >= 1) {
      achievements.push({ type: 'perfect_score', name: 'Perfect Score', description: 'Got 10/10 on a quiz!', icon: '⭐', earned: true });
    }
    
    if (completedCount === 5) {
      achievements.push({ type: 'all_modules', name: 'Master Learner', description: 'Completed all 5 modules!', icon: '🏆', earned: true });
    }
    
    if (perfectScores === 5) {
      achievements.push({ type: 'quiz_master', name: 'Quiz Master', description: 'Perfect scores on all modules!', icon: '👑', earned: true });
    }
    
    res.render('achievements', {
      userName: req.session.userName,
      achievements,
      stats: {
        completedModules: completedCount,
        perfectScores,
        totalScore
      }
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

// Study Guide page
router.get('/study-guide', requireAuth, (req, res) => {
  res.render('study-guide', {
    userName: req.session.userName
  });
});

// Leaderboard page
router.get('/leaderboard', requireAuth, async (req, res) => {
  try {
    const users = await User.find({}).select('name progress');
    
    // Calculate total scores for each user
    const leaderboard = users.map(user => {
      const modules = ['html', 'css', 'js', 'react', 'node'];
      let totalScore = 0;
      let completedModules = 0;
      
      modules.forEach(module => {
        if (user.progress[module] && user.progress[module].completed) {
          totalScore += user.progress[module].score || 0;
          completedModules++;
        }
      });
      
      return {
        name: user.name,
        totalScore,
        completedModules
      };
    })
    .filter(user => user.completedModules > 0) // Only show users who completed at least one module
    .sort((a, b) => {
      // Sort by total score, then by completed modules
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      return b.completedModules - a.completedModules;
    })
    .slice(0, 50); // Top 50
    
    res.render('leaderboard', {
      userName: req.session.userName,
      leaderboard
    });
  } catch (error) {
    res.redirect('/learning/modules');
  }
});

module.exports = router;

