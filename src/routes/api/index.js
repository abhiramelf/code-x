// Classifies the routes based on usage

const router = require('express').Router();

router.use('/code', require('./explainCodeRouter'));

module.exports = router;