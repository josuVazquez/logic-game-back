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

router.post('/create', async (req, res) => {
    try {
        await quizzCode.generate();
        quizzCode.sendNewsletter();
        res.status(200);
        res.json({});
    } catch(error) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
});

module.exports = router;