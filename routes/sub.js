const router = require('express').Router();
const Sub = require('../models/Sub');

router.post('/', async (req, res) => {
    try {
        const newSUb = await Sub.create(req.body);
        res.json(newSUb);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;