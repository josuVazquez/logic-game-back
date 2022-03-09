const router = require('express').Router();
const Quizz = require('../models/Quizz');

router.get('/', (req, res) => {
    Quizz.find().sort('-date')
        .then(outfit => {
            res.json(outfit);
        })
        .catch(error => {
            res.json(error);
    });
});

module.exports = router;