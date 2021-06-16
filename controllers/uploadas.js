const { request, response } = require('express');


const cargarArchivo = async( req = request, res = response ) => {

    res.json({
        msg: 'Hola desde cargar archivo'
    });

}


module.exports = {
    cargarArchivo
}

