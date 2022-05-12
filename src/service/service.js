const func = require('./function');
const auth = require('./../Authenticator/barCodeAuthenticator');

module.exports = {
    barcodeGenerator: async (req, res) => {
        
        const barCode = req.params.code;
        let json = { error: [], result: [] };

        if(auth.Authenticator(barCode) === 0 && func.getBarCode(barCode) !== -1){
            try {
                const newBarCode = func.getBarCode(barCode);
                const bankName = await func.getNameBank(barCode).then(result => result);
                const amount = func.getAmount(barCode);
                const expirationDate = func.getDate(barCode);
    
                json.result.push({
                    barCode: newBarCode,
                    bankName: bankName,
                    amount: amount,
                    expirationDate: expirationDate
                });

            } catch(e) {
                json.error.push(e);
                res.json(json.error);
            }

            res.json(json.result);
        } else {
            if (func.getBarCode(barCode) === -1) {
                json.error.push({ Error: "A representação numérica do código de barras possui algum(ns) dígito(s) inválido(s)!" });
            } else {
                json.error.push({ Error: auth.Authenticator(barCode) });
            }

            res.json(json.error);
        }        
    }
}