module.exports = {
    barCodeValidate: (barCode, dv) => {
        const codigo = barCode.split('').reverse();
        const somatorio = codigo.reduce((acc, current, index) => {
            let indice = (((index + 1) % 2) + 1);
            let soma = Number(current) * indice;
            soma = (soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma);
            return acc + soma;
        }, 0);

        return ((Math.ceil(somatorio / 10) * 10) - somatorio) === dv;
    },
    newBarCodeValidate: (barCode, dv) => {
        const partOne = barCode.substring(0, 4);
        const partTwo = barCode.substring(5, barCode.length);
        const newBarCode = partOne + partTwo;

        const codigo = newBarCode.split('').reverse();

        let multiplicador = 2;
        const somatorio = codigo.reduce((acc, current) => {
            const soma = Number(current) * multiplicador;
            multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
            return acc + soma;
        }, 0);

        const restoDivisao = somatorio % 11;
        let DV = 11 - restoDivisao;

        if (DV === 0 || DV === 10 || DV === 11) 
                DV = 1;

        return DV === Number(dv);
    }
}