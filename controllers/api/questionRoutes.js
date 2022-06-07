const router = require('express').Router();
const { Question } = require('../../models/');
const withAuth = require('../../utils/auth')

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

module.exports = router;
