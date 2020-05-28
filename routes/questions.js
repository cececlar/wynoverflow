const router = require('express').Router();
const answers = require('./answers');
const Question = require("../models/question.model").Question;

router.route('/').get((req, res) => {
  Question.find()
  .then(questions => res.json(questions))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  let id = req.params.id;
  Question.findById(id)
  .then(question => res.json(question))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const text = req.body.text;
  const createdAt = req.body.createdAt;
  const answers = req.body.answers;

  const newQuestion = new Question({
    text,
    createdAt,
    answers,
  });

  newQuestion.save()
  .then(() => res.json('Question added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.use('/:id/answers', function(req, res, next) {
  req.id = req.params.id;
  next()
}, answers);

module.exports = router;