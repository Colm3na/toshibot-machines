// Importamos modulos
const http = require('http')
// Funcion que recibe los parametros, el objeto con la peticion
// y el objeto con la respuesta
function callback(request, response){
  response.end('Amparoo')
}
// Crea un servidor web y le asocias una funcion callback
const server = http.createServer(callback)
server.listen(8080)
