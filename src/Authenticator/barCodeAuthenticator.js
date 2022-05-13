module.exports = {
    Authenticator: barCode => {
        /* Verifica a quantidade de digitos dos 2 boletos com as respectivas restrições. */
        if((barCode.length < 47 || barCode.length > 48) || 
           (barCode.length >= 48 && barCode.substring(0, 1) !== '8') ||
           (barCode.length < 47 && barCode.substring(0, 1) === '8'))
                return  "Quantidade de digitos inválidos!";

        /* Verifica se a linha digitável possui caracteres inválidos*/
        if (!/^[0-9]{47,48}$/.test(barCode))
            return "Linha digitavel possui caracteres inválidos!";

        /* Erro do tipo boleto de titulo em que a primeira posição da linha é o digito 8 */
        if(barCode.length === 47 && barCode.substring(0, 1) === '8')
            return "Tipo de boleto inválido!";

        return 0;
    }
}