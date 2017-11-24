// Importamos modulos
const http = require('http')

// Compactamos codigo, por que la funcion solo es llamada por
// server.on
const server = http.createServer()
server.on('request', (request, response) =>{
  response.end('Amparoo no toque naaaah')
})
server.listen(8080)
