const router = require('express').Router();
const Answer = require("../models/question.model").Answer;

router.post('/', function(req, res, next) {
    let id = req.id; 
    const text = req.body.text;
    const createdAt = req.body.createdAt;
    const updatedAt = req.body.updatedAt;
  
    const newAnswer = new Answer({
      text,
      createdAt,
      updatedAt,
    });
  
    newAnswer.save()
    .then(() => res.json('Answer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/', function(req, res, next) {
    let id = req.id;
    Answer.find({})
    .then(answers => res.json(answers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:answerId', function(req, res, next) {
    let id = req.id; 
    let answerId = req.params.answerId;
    Answer.findById(req.params.answerId)
    .then(answer => {
      answer.text = req.body.text;

      answer.save()
        .then(() => res.json('Answer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:answerId', function(req, res, next) {
    let id = req.id; 
    let answerId = req.params.answerId;

    Answer.findByIdAndDelete(req.params.answerId)
    .then(() => res.json('Answer deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

  module.exports = router;