const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Machine = require('./models/machine');
const Product = require('./models/product');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/toshi-machines');

mongoose.connection.on('error', (error) => {
  console.error(error);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a la BBDD');

  // ///////////
  // Machines //
  // ///////////

  // CREATE
  app.post('/machines', (req, res) => {
    if (!req.body.serialNumber) {
      return res.status(400).end();
    }

    const machine = new Machine();
    machine.serialNumber = req.body.serialNumber;
    machine.createdAt = Date.now();

    machine.save((err, element) => {
      if (err) {
        return res.status(500).end(JSON.stringify(err));
      }

      res.end(JSON.stringify(element));
    });
  });

  // GET ALL
  app.get('/machines', (req, res) => {
    Machine.find((err, elements) => {
      if (err) throw err;

      return res.end(JSON.stringify(elements));
    });
  });

  // GET
  app.get('/machines/:id', (req, res) => {
    if (!req.params.id) throw Error('No ID provided');

    Machine.findById(req.params.id, (err, element) => {
      if (err) {
        res.status(400).end(JSON.stringify(err));
      }

      res.end(JSON.stringify(element));
    });
  });

  // UPDATE
  app.put('/machines/:id', (req, res) => {
    if (!req.params.id) throw Error('No ID provided');

    Machine.findById(req.params.id, (err, element) => {
      if (err) {
        return res.status(400).end(JSON.stringify(err));
      }

      if (!element) {
        return res.status(404).end('Machine not found');
      }

      element.serialNumber = req.body.serialNumber;
      element.save((err) => {
        if (err) {
          res.status(400).end(JSON.stringify(err));
        }

        res.end(JSON.stringify(element));
      });
    });
  });

  // DELETE
  app.delete('/machines/:id', (req, res) => {
    if (!req.params.id) throw Error('No ID provided');

    Machine.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(400).end(JSON.stringify(err));
      }

      res.end();
    });
  });

  // ///////////
  // Products //
  // ///////////

  // CREATE
  app.post('/products', (req, res) => {
    if (!req.body.name || !req.body.price) {
      return res.status(400).end(JSON.stringify({ error: 'Name and price are required' }));
    }

    const product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;

    product.save((err, element) => {
      if (err) throw err;

      res.end(JSON.stringify(element));
    });
  });

  // GET ALL
  app.get('/products', (req, res) => {
    Product.find((err, elements) => {
      if (err) throw err;

      return res.end(JSON.stringify(elements));
    });
  });

  // GET
  app.get('/products/:id', (req, res) => {
    if (!req.params.id) throw Error('No ID provided');

    Product.findById(req.params.id, (err, element) => {
      if (err) {
        res.status(400).end(JSON.stringify(err));
        return;
      }

      res.end(JSON.stringify(element));
    });
  });

  // UPDATE
  app.put('/products/:id', (req, res) => {
    if (!req.params.id) throw Error('No ID provided');

    Product.findById(req.params.id, (err, element) => {
      if (err) {
        return res.status(500).end(JSON.stringify(err));
      }

      if (!element) {
        return res.status(404).end('Product not found');
      }

      if (req.body.name) {
        element.name = req.body.name;
      }
      if (req.body.price) {
        element.price = req.body.price;
      }

      element.save((err) => {
        if (err) {
          res.status(500).end(JSON.stringify(err));
        }

        res.end(JSON.stringify(element));
      });
    });
  });

  // DELETE
  app.get('/products/:id', (req, res) => {
    if (!req.params.id) throw Error('No ID provided');

    Product.remove({ _id: req.params.id }, (err) => {
      if (err) {
        return res.status(500).end(JSON.stringify(err));
      }

      res.end();
    });
  });

  app.post('/machines/:id/products', (req, res) => {
    if (!req.params.id) {
      return res.status(400).end(JSON.stringify({ error: 'No ID provided' }));
    }

    if (!req.body.amount) {
      return res.status(400).end(JSON.stringify({ error: 'Amount cannot be 0' }));
    }

    if (!req.body.product) {
      return res.status(400).end(JSON.stringify({ error: 'No product provided' }));
    }

    Machine.findById(req.params.id, (err, machine) => {
      if (err) {
        return res.status(500).end(JSON.stringify(err));
      }

      if (!machine) {
        return res.status(404).end('Machine not found');
      }

      Product.findById(req.body.product, (err, product) => {
        if (err) {
          return res.status(500).end(JSON.stringify(err));
        }

        if (!product) {
          return res.status(404).end(JSON.stringify({ error: 'Product not found' }));
        }

        const products = machine.products.filter(element =>
          element.product.toString() === req.body.product);

        const p = products.pop();
        if (p) {
          p.amount += req.body.amount;
        } else {
          machine.products.push({ amount: req.body.amount, product: req.body.product });
        }

        machine.save((err, result) => {
          if (err) {
            return res.status(500).end(JSON.stringify(err));
          }

          res.end(JSON.stringify(result));
        });
      });
    });
  });

  // //////////
  // Default //
  // //////////

  app.get('*', (req, res) => res.status(404).end('Paso de todo'));

  server.listen(8080);
});
