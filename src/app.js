// Importamos modulos
const http = require('http')

// Crea un servidor web, configuramos la funcion requestHandler
// como callback para las peticiones
const server = http.createServer()
server.on('request', callback)
server.listen(8080)

// Funcion que recibe los parametros, el objeto con la peticion
// y el objeto con la respuesta

function requestHandler(request, response){
  response.end('Amparoo no toque naaaah')
}
