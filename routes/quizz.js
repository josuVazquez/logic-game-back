const router = require('express').Router();
const Quizz = require('../models/Quizz');

router.get('/', (req, res) => {
    Quizz.findOne().sort('-date')
        .then(date => {
            res.json(date);
        })
        .catch(error => {
            res.json(error);
    });
});

module.exports = router;