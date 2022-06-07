const router = require('express').Router();
const { Question } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const questionData = await Question.findAll({});

    const questions = questionData.map((question) =>
      question.get({ plain: true })
    );

    res.render('login', {
      questions,
      // Pass the logged in flag to the template
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withAuth, async (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Redirects user to questions page if they are logged in
router.get('/dashboard', async (req, res) => {
  const questionData = await Question.findAll().catch((err) => {
    console.log('is logged in: ', req.session.loggedIn);
    if (err) res.json(err);
  });
  const questions = questionData.map((question) => question.get({ plain: true }));
  res.render('question', {
    questions,
    username: req.session.username,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
