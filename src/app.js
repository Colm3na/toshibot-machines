
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();
const server = http.createServer(app);

// Conectar a la base de datos, le pasamos la uri
mongoose.connect('mongodb://localhost/toshi-machines');
// Listeners
mongoose.connection.on('error', (error) => {
  console.error(error);
});
// Listeners
mongoose.connection.once('open', () => {
  console.log('Conectado a la BBDD');

// /////////////////////////////////////////////////////////////////////////////
// Middlewares
// /////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());

// /////////////////////////////////////////////////////////////////////////////
// Manejadores de peticiones
// /////////////////////////////////////////////////////////////////////////////

app.get('/machines', (req, res) => {
  res.json({
    machines: [
      {
        id: '12345',
        products: [333, 44, 555, 224],
        location: {
          lat: 1234,
          long: 212,
        },
      },
      {
        id: '33333',
        products: [123, 333, 44, 221],
        location: {
          lat: 333,
          long: 4455,
        },
      },
    ],
  });
});

app.get('*', (req, res) => res.status(404).end('Paso de todo'));

server.listen(8080);
});
