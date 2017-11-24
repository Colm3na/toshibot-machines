const http = require('http')

const server = http.createServer()
server.on('request', (request, response) => {
  let body = ''

  request.on('data', data => {
    body = body + data
  })

  request.on('end', () => {
    console.log(body)
    response.end('Hola colmena')
  })
})

server.listen(8080)
