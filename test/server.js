const express = require('express');
const titleFunc = require('../src/service/titleTicketService');
const dealershipFunc = require('../src/service/dealershipTicketService');
const auth = require('../src/Authenticator/barCodeAuthenticator');

const app = express();

app.get('/boleto/:code', (req, res) => {

    const barCode = req.params.code;

    const funcValueTest = barCode.length === 47 ? 
        titleFunc.getBarCode(barCode) :
        dealershipFunc.getBarCode(barCode);

    let error = {};

    if(auth.Authenticator(barCode) === 0 && funcValueTest !== -1){
        
        barCode.length === 47 ?
            res.status(200).json(titleFunc.getResult(barCode)) : 
            res.status(200).json(dealershipFunc.getResult(barCode));

    } else {

        if (auth.Authenticator(barCode) !== 0) {
            error.error = auth.Authenticator(barCode);
        } else {
            error.error = "A representação numérica do código de barras possui algum(ns) dígito(s) inválido(s)!";
        }

        res.status(400).json(error);
    }   
});

module.exports = app