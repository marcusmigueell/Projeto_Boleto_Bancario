const fetch = require('node-fetch');

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
    getNameBank,
    getAmount, 
    getDate
};