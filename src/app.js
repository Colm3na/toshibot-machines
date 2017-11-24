// Importamos módulos.
const http = require('http')
// Función que se ejecuta cuando llegue la petición.
const server = http.createServer()
server.on('request', (request, response) => {
  let body = ''
  // Concatenamos mas datos de la misma petición.
  request.on('data', data => {
    body = body + data
  })
  // Evento que se ejecuta cuando se terminan de llegar los datos.
  request.on('end', () => {
    console.log(body)
    response.end('Hola colmena')
  })
})
// El puerto donde está escuchando.
server.listen(8080)
