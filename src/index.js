const app = require('./app');
const router = app._router;

app.use('/', router);

app.listen(8080, () => {
    console.log(`Backend Executando...`);
});