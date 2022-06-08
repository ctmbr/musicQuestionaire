const router = require('express').Router();
const { Question, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const questionData = await Question.findAll({});

//     const questions = questionData.map((question) => question.get({ plain: true })
//     );

//     res.render('login', {
//       questions,
//       // Pass the logged in flag to the template
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//Example from project (Original Above)
router.get('/', async (req, res) => {
  try {
    // Get all answers JOIN with user data
    const questionData = await Question.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const questions = questionData.map((question) => question.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('login', { // Renders The Login Page
      questions, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//match the  questions with logged in user
router.get('/questions/:id', async (req, res) => {
  try {
    const questionData = await Question.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const question = questionData.get({ plain: true });

    res.render('questions', {
      ...question,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/questions', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Question }],
    });

    const user = userData.get({ plain: true });
    // Render Pofile page in handlebars
    res.render('questions', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', withAuth, async (req, res) => {
  // If the user is already logged in, redirect to the questions page
  if (req.session.loggedIn) {
    res.redirect('/questions');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
