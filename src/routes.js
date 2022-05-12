const express = require('express');
const router = express.Router();
const func = require('./controller/ticketController')

router.get('/boleto/:code', func.barcodeGenerator);

module.exports = router;