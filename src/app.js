const express = require('express');

class BoletoController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes(){
        this.express.use(require('./routes'));
    }
}

module.exports = new BoletoController().express;