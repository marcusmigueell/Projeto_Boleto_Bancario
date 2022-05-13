const titleFunc = require('../service/titleTicketService');
const dealershipFunc = require('../service/dealershipTicketService');
const auth = require('../Authenticator/barCodeAuthenticator');

module.exports = {
    barcodeGenerator: async (req, res) => {
        
        const barCode = req.params.code;

        const funcValueTest = barCode.length === 47 ? 
                        titleFunc.getBarCode(barCode) :
                        dealershipFunc.getBarCode(barCode);

        let json = { error: [], result: [] };

        if(auth.Authenticator(barCode) === 0 && funcValueTest !== -1){

            barCode.length === 47 ?
                res.status(200).json(await titleFunc.getResult(barCode)) : 
                res.status(200).json(dealershipFunc.getResult(barCode));

        } else {

            if (auth.Authenticator(barCode) !== 0) {
                json.error.push({ Error: auth.Authenticator(barCode) });
            } else {
                json.error.push({ Error: "A representação numérica do código de barras possui algum(ns) dígito(s) inválido(s)!" });
            }

            res.status(400).json(json.error);
        }        
    }
}