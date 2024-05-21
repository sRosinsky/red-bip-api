const http = require('http')
const ch = require('cheerio')


function PeticionPost(numTarjeta) {

    let opciones = {
        hostname: "pocae.tstgo.cl",
        port: 80,
        path: `/PortalCAE-WAR-MODULE/SesionPortalServlet?accion=6&NumDistribuidor=99&NomUsuario=usuInternet&NomHost=AFT&NomDominio=aft.cl&Trx&RutUsuario=0&NumTarjeta=${numTarjeta}&bloqueable=`,
        method: 'POST',
        headers: {
            'Content-Type': 'text/html',
            'content-encoding': 'gzip'
    }
    }


return new Promise((resolved, rejected) => {
    const req = http.request(opciones, (response) => {
      let resultadoString = "";

      response.on("data", (codigo) => {
        resultadoString += codigo;
      });

      response.on("end", () => {
        if (response.statusCode === 200) {
          numTarjeta = parseInt(numTarjeta);

          if (isNaN(numTarjeta) || numTarjeta < 0) {
            resolved(["El dato ingresado es inválido"]);
          } else {
            numTarjeta = numTarjeta.toString();
            const html = ch.load(resultadoString);
            let arrayData = [];
            if (numTarjeta.length > 0 && numTarjeta.length <= 11) {
              try {
                for (let i = 0; i <= 3; i++) {
                  arrayData.push(
                    html('td[bgcolor="#B9D2EC"]')[i]["children"][0].data
                  );
                }

                resolved(arrayData);
              } catch (error) {
                resolved(["Error Inesperado"]);
              }
            } else {
              resolved(["El dato ingresado es inválido"]);
            }
          }
        } else {
          rejected(`Error inesperado ${res.statusCode}`);
        }
      });
    });
    
    req.on('error', err => {console.log(err);})
    req.end()
})

}

module.exports = async function asincronia(numTarjeta) {
    try {
        obtencion_datos = await PeticionPost(numTarjeta)
        return obtencion_datos
    } catch (err) {
        console.log(err)
    }

}



