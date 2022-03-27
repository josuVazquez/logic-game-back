const router = require('express').Router();
const Ranking = require('../models/Ranking');

router.get('/', (req, res) => {
    Ranking.findOne().sort({number: -1, date: '-date'}).limit(10)
        .then(date => {
            res.json(date);
        })
        .catch(error => {
            res.json(error);
    });
});

router.post('/add', async (req, res) => {
    try {
        const ranking = await Ranking.create(req.body);
        res.json(ranking);
    } catch(err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
});

module.exports = router;