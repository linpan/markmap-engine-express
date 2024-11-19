// healthcheck api route
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    res.status(200).send('OK');
});

module.exports = router;
