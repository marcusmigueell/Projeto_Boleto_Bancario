const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/bank/:COMPE', (req, res) => {
    fetch(`https://brasilapi.com.br/api/banks/v1/${req.params.COMPE}`)
        .then(resp => resp.json())
        .then(dados => res.send(dados));
});

app.listen(3000, () => {
    console.log(`Backend Executando...`);
});
