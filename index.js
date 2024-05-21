const express = require('express')
const tarjetaBip = require('./lib/tarjetaBip')

let api = express()
port = 3000

api.get('/api/:numerotarjeta', (req, res) => {
    numtarjeta = 0
    if (res.statusCode == 200) {
      numtarjeta = req.params.numerotarjeta;
      tarjetaBip(numtarjeta).then((data) => {
        const jsonData = {
          numTarjeta: data[0],
          tipoContrato: data[1],
          monto: data[2],
          utlimaVezActualizado: data[3],
        };
        res.json(jsonData)
    })    
    } else {
      res.send(`Ocurrió un error: ${res.statusCode}`);
    }
})

api.all('/api', (req, res, next) => {
  res.redirect('/')
})

api.all('/', (req, res) => {
  const jsonData = {
    'error' : 'Método no permitido'
  }
  res.json(jsonData)
})

api.listen(port, () => {
    console.log('La aplicación de express está escuchando')
})

