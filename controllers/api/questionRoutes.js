const router = require('express').Router();
const { Question } = require('../../models/');
const withAuth = require('../../utils/auth')

// router.get('/' ,withAuth, async(req, res) => {
// Create get route that needs the user to be authenticated before loggin in
// })

router.post('/',withAuth, async (req, res) => {
  try {
    const newQuestion = await Question.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newQuestion);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const questionData = await Question.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!questionData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(questionData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
