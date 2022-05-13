const auth = require('../Authenticator/titleBarCodeAuthenticator');

const getBarCode = barCode => {

    const fieldOne = barCode.substring(0, 11);
    const FieldOneDv = Number(barCode.substring(11, 12));
    
    const fieldTwo = barCode.substring(12, 23);
    const fieldTwoDv = Number(barCode.substring(23, 24));
    
    const fieldThree = barCode.substring(24, 35);
    const fieldThreeDv = Number(barCode.substring(35, 36));
    
    const fieldFour = barCode.substring(36, 47);
    const fieldFourDv = Number(barCode.substring(47, 48));
    /* Retornar erro na validação dos DVs de cada campo. */
    if( !auth.barCodeValidate(fieldOne, FieldOneDv) ||
        !auth.barCodeValidate(fieldTwo, fieldTwoDv) ||
        !auth.barCodeValidate(fieldThree, fieldThreeDv) ||
        !auth.barCodeValidate(fieldFour, fieldFourDv) ) 
                return -1;


    const code = fieldOne + fieldTwo + fieldThree + fieldFour
    const newBarCode = auth.newBarCode(code);

    return newBarCode
}

// Retornar valor do boleto.
const getAmount = barCode => {
    const real = parseFloat(barCode.substring(4, 13));
    const centavos = barCode.substring(13, 15);
    
    const ticketValue = real.toString() + '.' + centavos; 

    return ticketValue;
};

// Retornar data de vencimento do boleto se existir.
const getDate = barCode => {

    const newDate = new Date();
    const currentYear = newDate.getFullYear();

    const year = Number(barCode.substring(27, 31));
    if( year > currentYear + 1 ) return false;
    
    const month = barCode.substring(31, 33);
    const day = barCode.substring(33, 35);

    return `${year.toString()}-${month.toString()}-${day.toString()}`;
};
  
// Retornar os dados finais para a controller
const getResult = barCode => {

    let result = {};
    let error = {};

    try {
        const newBarCode = getBarCode(barCode);
        const amount = getAmount(newBarCode);
        const expirationDate = getDate(newBarCode);
        // Retornar data de vencimento do boleto entre os dados finais para controller se existir.
        if(expirationDate !== false) {
            result.barCode = newBarCode;
            result.amount = amount;
            result.expirationDate = expirationDate;
        } else {
            result.barCode = newBarCode;
            result.amount = amount;
        }

    }catch(e) {
            
        error.error = e;
        return error;

    }

    return result;
};

module.exports = {
    getResult,
    getBarCode
};