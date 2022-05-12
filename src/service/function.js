const fetch = require('node-fetch');
const auth = require('./../Authenticator/titleBarCodeAuthenticator');

const getBarCode = barCode => {

    const fieldOne = barCode.substring(0, 9);
    const FieldOneDv = Number(barCode.substring(9, 10));

    const fieldTwo = barCode.substring(10, 20);
    const fieldTwoDv = Number(barCode.substring(20, 21));

    const fieldThree = barCode.substring(21, 31);
    const fieldThreeDv = Number(barCode.substring(31, 32));

    if( !auth.barCodeValidate(fieldOne, FieldOneDv) ||
        !auth.barCodeValidate(fieldTwo, fieldTwoDv) ||
        !auth.barCodeValidate(fieldThree, fieldThreeDv) ) 
                return -1;


    const bank = barCode.substring(0,4);
    const dv = barCode.substring(32,33);
    const dueDate = barCode.substring(33,37);
    const value = barCode.substring(barCode.length - 10, barCode.length);
    const fieldOneFree = barCode.substring(4, 9);
    const fieldTwoFree = barCode.substring(10, 20);
    const fieldThreeFree = barCode.substring(21, 31);

    const newBarCode = bank + dv + dueDate + value + fieldOneFree + fieldTwoFree + fieldThreeFree;
    
    if( !auth.newBarCodeValidate(newBarCode, dv) )
        return -1;

    return newBarCode
}

const getNameBank = COMPE => {  
    return fetch(`https://brasilapi.com.br/api/banks/v1/${COMPE.substring(0,3)}`)
        .then(res => res.json())
        .then(dados => dados.name);
};

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
  
module.exports = {
    getBarCode,
    getNameBank,
    getAmount, 
    getDate
};