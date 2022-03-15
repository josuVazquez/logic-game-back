const router = require('express').Router();
const Quizz = require('../models/Quizz');
var quizzCode = require('../scheduleJobs/quizzCode');

router.get('/', (req, res) => {
    Quizz.findOne().sort('-date')
        .then(date => {
            res.json(date);
        })
        .catch(error => {
            res.json(error);
    });
});

router.get('/create', (req, res) => {
    try {
        quizzCode.generate();
        quizzCode.sendNewsletter();
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;