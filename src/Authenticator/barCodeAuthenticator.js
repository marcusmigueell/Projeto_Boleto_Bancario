module.exports = {
    Authenticator: barCode => {
    
        if((barCode.length < 47 || barCode.length > 48) || 
           (barCode.length >= 48 && barCode.substring(0, 1) !== '8') ||
           (barCode.length < 47 && barCode.substring(0, 1) === '8'))
                return  "Quantidade de digitos inválidos!";

        if (!/^[0-9]{47,48}$/.test(barCode))
            return "Linha digitavel possui caracteres inválidos!";

        if(barCode.length === 47 && barCode.substring(0, 1) === '8')
            return "Tipo de boleto inválido!";

        return 0;
    }
}