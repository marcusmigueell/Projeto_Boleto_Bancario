const titleFunc = require('../service/titleTicketService');
const dealershipFunc = require('../service/dealershipTicketService');
const auth = require('../Authenticator/barCodeAuthenticator');

module.exports = {
    barcodeGenerator: async (req, res) => {
        
        const barCode = req.params.code;
        /*  Teste para validar a linha digitável enviado pela API    *
         *  se retornar -1 significa que algum digito do boleto esta errado. */ 
        const funcValueTest = barCode.length === 47 ? 
                        titleFunc.getBarCode(barCode) :
                        dealershipFunc.getBarCode(barCode);

        let error = {};
        /*  O Authenticator verifica erros como:
                - Quantidade de digitos inválidos;
                - Se a linha digitavel possui caracteres inválidos;
                - Se é um tipo de boleto inválido.  */
        if(auth.Authenticator(barCode) === 0 && funcValueTest !== -1){

            barCode.length === 47 ?
                res.status(200).json(titleFunc.getResult(barCode)) : 
                res.status(200).json(dealershipFunc.getResult(barCode));

        } else {
            /*  Essa verificação auth.Authenticator(barCode) !== 0 é para afirmar que o erro inicial
                será que a representação numérica do código de barras possui digitos invalidos, ou seja,
                o erro não será retornado pelo autenticador de linha digitável.   */
            if (auth.Authenticator(barCode) !== 0) {
                error.error = auth.Authenticator(barCode);
            } else {
                error.error = "A representação numérica do código de barras possui algum(ns) dígito(s) inválido(s)!";
            }

            res.status(400).json(error);
        }        
    }
}