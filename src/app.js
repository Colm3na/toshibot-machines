const http = require('http')
const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')


const app = express()
const server = http.createServer(app)
const db = mongoose.connection
app.use(bodyparser.json()) //automáGicamente

mongoose.connect('mongodb://localhost/toshi-machines')

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('Conectado a la BBDD')

  app.get('/', (req, res) => res.end('No hago nada'))

  app.get('/machines', (req, res) => {
    res.end('No hago nada')
  })

  app.get('/products', (req, res) => {
    Product.find((err, product) => {
      console.log(product)
      res.json(product)
    })
  })

  app.post('/power', (req, res) => {
    res.end(JSON.stringify({ resultado: req.body.numero * req.body.numero})+'\n')
  })

  app.get('*', (req, res) => res.status(404).end('Error 404: Not Found.'+'\n'))

  server.listen(8080)
})
// server.on('request', (request, response) => {
//   if(request.method === 'GET') {
//     return response.end('Recibiendo datos por método GET\n')
//   }
//
//
//   let body = ''
//
//   request.on('data', data => {
//     body = body + data
//   })
//
//   request.on('end', () => {
//     const datos = JSON.parse(body)
//
//     const res = { resultado: datos.numero * datos.numero}
//     // console.log(body)
//     response.end(JSON.stringify(res)+'\n')
//   })
// })
