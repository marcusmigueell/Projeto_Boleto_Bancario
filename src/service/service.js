const func = require('./function');

module.exports = {
    amount: async (req, res) => {
        //validador da linha digitavel
        let json = {
            error: [],
            result: []
        };
        try {
            const barCode = req.params.code;

            const bankName = await func.getNameBank(barCode).then(result => result);
            const amount = func.getAmount(barCode);
            const expirationDate = func.getDate(barCode);

            json.result.push({
                barCode: '21299758700000020000001121100012100447561740',
                bankName: bankName,
                amount: amount,
                expirationDate: expirationDate
            });
        } catch(e) {
            json.error.push(e);
            res.json(json.error);
        }
        res.json(json.result);
    }
}