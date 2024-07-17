const express = require("express");
const env = require('dotenv').config()
const tarjetaBip = require("./lib/tarjetaBip");
const estadoRed = require("./lib/estadoRed");
let api = express();

api.set("port", process.env.PORT)
api.get("/api/estadored", (req, res) => {

  estadoRed()
    .then((data) => {
      jsonData = {
        respuestaBip: true,
        estadoRedMetro: {
          L1: data[0],
          L2: data[1],
          L3: data[2],
          L4: data[3],
          L4a: data[4],
          L5: data[5],
          L6: data[6],
          trenNos: data[7],
        },
      };
      res.send(jsonData);
    })
    .catch((error) => {
      jsonData = {
        respuestaBip: false,
        error,
      };
      res.send(jsonData);
    });
});

api.get("/api/bip/:numerotarjeta", (req, res) => {
  let jsonData = {};
  numtarjeta = req.params.numerotarjeta;
  tarjetaBip(numtarjeta)
    .then((data) => {
      jsonData = {
        respuestaBip: true,
        datosTarjeta: {
          numeroTarjeta: data[1],
          tipoContrato: data[2],
          balance: data[3],
          fechaSaldo: data[4],
        },
      };

      res.json(jsonData);
    })
    .catch((error) => {
      jsonData = {
        respuestaBip: false,
        error,
      }
      res.json(jsonData)
    });
});

api.all("/api/bip/", (req, res, next) => {
  res.redirect("/")
});


api.all("/api/", (req, res, next) => {
  res.redirect("/");
});

api.all("/", (req, res) => {
  res.json({respuestaBip: "Método no permitido."});
});
api.all("*", (req,res) => {
  res.json({respuestaBip: "Método no permitido."})
})

api.listen(api.get("port"), () => {
  console.log(`La aplicación de express está a la escucha en el puerto ${api.get("port")}`);
});
