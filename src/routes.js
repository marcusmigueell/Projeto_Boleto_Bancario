const router = require('express').Router();
const ticketControl = require('./controller/ticketController')

router.get('/boleto/:code', ticketControl.barcodeGenerator);

module.exports = router;