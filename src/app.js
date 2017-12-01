// Importamos módulos.
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
// Inicializamos módulos.
const app = express()
const server = http.createServer(app)
// Le decimos a express que use middleware (Funciones que se ejecutan de forma intermedia) bodyParser
app.use(bodyParser.json())
// Peticion del tipo GET al servidor
app.get('/', (req, res) => res.end('No hago nada'))
// Peticion del tipo POST al servidor
app.post('/power', (req, res) => {
  res.end({ resultado: req.body.numero * req.body.numero})
})
