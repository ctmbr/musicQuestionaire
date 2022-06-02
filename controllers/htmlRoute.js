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

    res.render('questions', {
      questions,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  console.log('homepage root route');
  const blogData = await Blog.findAll().catch((err) => {
    console.log('is logged in: ', req.session.loggedIn);
    if (err) res.json(err);
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('blog', {
    blogs,
    username: req.session.username,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
