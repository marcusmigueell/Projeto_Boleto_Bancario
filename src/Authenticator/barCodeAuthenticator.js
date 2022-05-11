module.exports = {
    Authenticator: barCode => {
    
        if(barCode.length < 47 || barCode.length > 48)
            return  "Quantidade de digitos inválidos!";

        if (!/^[0-9]{47,48}$/.test(barCode))
            return "Linha digitavel possui caracteres inválidos!";

        return 0;
    }
}