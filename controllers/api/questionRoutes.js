const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Question } = require('../../models/');
const withAuth = require('../../utils/auth');

// Post Questions And Responses Available To User
router.post('/', withAuth, async (req, res) => { // Post data entered by user in login.handlebars
  try {
    const questionData = await Question.create(req.body);
    req.session.save(() => {
      req.session.question_id = questionData.id;
      req.session.question = questionData.question;
      req.session.answers = questionData.answers;
      req.session.loggedIn = true;
      console.log(req.session)
      res.status(200).json(questionData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


// Create post method to fufill question.js fet request in Public folder
router.post('/choices', async (req, res) => {
  console.log('choices route was hit')
  console.log(req.body)
  try {
    // Find the user who matches the posted e-mail address
    const questionData = await Question.findOne({ where: { 
      answers: req.body.genreAnswer
    } });
    const questionData2 = await Question.findOne({ where: { 
      answers: req.body.decadeAnswer
    } });
    console.log(37,questionData,questionData2)
    // if (!questionData) {
    //   res
    //     .status(400)
    //     .json({ message: 'Please choose a genre and decade' });
    //   return;
    // }

    // Create session variables based on the logged in user
    req.session.loggedIn = true;
    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.email = userData.email;
    req.session.save(() => {
      console.log(req.session)
      res.json({ question: questionData});
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;
