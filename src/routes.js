const express = require('express');
const router = express.Router();
const func = require('./controller/boletoController')

router.get('/boleto/:code', func.barcodeGenerator);

module.exports = router;