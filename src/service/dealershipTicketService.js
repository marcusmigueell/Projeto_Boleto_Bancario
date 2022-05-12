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

    if( !auth.barCodeValidate(fieldOne, FieldOneDv) ||
        !auth.barCodeValidate(fieldTwo, fieldTwoDv) ||
        !auth.barCodeValidate(fieldThree, fieldThreeDv) ||
        !auth.barCodeValidate(fieldFour, fieldFourDv) ) 
                return -1;


    const code = fieldOne + fieldTwo + fieldThree + fieldFour
    const newBarCode = auth.newBarCode(code);

    return newBarCode
}

const getAmount = barCode => {
    const real = parseFloat(barCode.substring(barCode.length - 10, barCode.length - 2));
    const centavos = barCode.substring(barCode.length - 2, barCode.length);
    const ticketValue = real.toString() + '.' + centavos; 

    return ticketValue;
};

const getDate = barCode => {
    const days = parseInt(barCode.substring(barCode.length - 14, barCode.length - 10));
    const expirationDate = new Date('1997-10-07 00:00:00.000');
    expirationDate.setDate(expirationDate.getDate() + days);

    return expirationDate.toLocaleString().substring(0, 10);
};
  

const getResult = barCode => {

    let json = { error: [], result: [] };

    try {
        const newBarCode = getBarCode(barCode);
        const amount = getAmount(barCode);
        const expirationDate = getDate(barCode);

        json.result.push({
            barCode: newBarCode,
            amount: amount,
            expirationDate: expirationDate
        });

    }catch(e) {
            
        json.error.push(e);
        return json.error;

    }

    return json.result;
};

module.exports = {
    getResult,
    getBarCode
};