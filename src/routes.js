const express = require('express');
const router = express.Router();
const func = require('./service/service')

router.get('/boleto/:code', func.amount);

module.exports = router;