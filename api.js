'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* const TS = require('./tabla_simbolos').TS;
const {procesarBloque} = require('./interprete'); */

const app = express();
const parser = require('./analyzer');

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.get('/',(req, res) => {
    const response={
        message: 'Bienvenido a TypeWise'
    };
    res.send(response);
});

const analyzer = require('./Endpoints/analyzer')(parser, app);
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
