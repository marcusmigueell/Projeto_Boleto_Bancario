const request = require('supertest');
const app = require('../src/app');


describe('Código de barras de convênio - SUCCESS.', () => {
    it('Com todas as informações.', async () => {
        const res = await request(app).get('/boleto/896100000000599800010119053332010064260000157446');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('barCode');
        expect(res.body).toHaveProperty('amount');
        expect(res.body).toHaveProperty('expirationDate');
    });

    it('Sem informação - data vencimento.', async () => {
        const res = await request(app).get('/boleto/836500000010007001380000667863106114000347150294');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('barCode');
        expect(res.body).toHaveProperty('amount');
    });

    it('Sem informação - data vencimento.', async () => {
        const res = await request(app).get('/boleto/822100002150048200974128322015409822901086059408');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('barCode');
        expect(res.body).toHaveProperty('amount');
    });
});

describe('Código de barras de convênio - ERROR.', () => {
    it('Representação numérica inválida.', async () => {
        const res = await request(app).get('/boleto/836500100010007001380000667863106114000347150294');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('Caracter inválido.', async () => {
        const res = await request(app).get('/boleto/8365000000100070013800E0667863106114000347150294');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('Quantidades de digitos inválidos.', async () => {
        const res = await request(app).get('/boleto/8961000000005998000101190533320100642600000157446');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('Código de barras de título - SUCCESS.', () => {
    it('Com todas as informações.', async () => {
        const res = await request(app).get('/boleto/21290001192110001210904475617405975870000002000');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('barCode');
        expect(res.body).toHaveProperty('amount');
        expect(res.body).toHaveProperty('expirationDate');
    });

    it('Com todas as informações.', async () => {
        const res = await request(app).get('/boleto/23793381286008300724968000063302589840000006192');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('barCode');
        expect(res.body).toHaveProperty('amount');
        expect(res.body).toHaveProperty('expirationDate');
    });
});

describe('Código de barras de título - ERROR.', () => {
    it('Caracter inválido.', async () => {
        const res = await request(app).get('/boleto/21290001192110001210904475617405975870000E02000');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('Representação numérica inválida.', async () => {
        const res = await request(app).get('/boleto/26090001192110001210904475617405975870000002000');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('Quantidades de digitos inválidos.', async () => {
        const res = await request(app).get('/boleto/2129000119211000121090475617405975870000002000');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    it('Tipo de boleto inválido.', async () => {
        const res = await request(app).get('/boleto/81290001192110001210904475617405975870000002000');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});