const { request, response } = require('express');

const buscar = async( req = request, res = response ) => {

    const { coleccion, termino } = req.params;

    res.json({
        coleccion,
        termino
    });
}

module.exports = {
    buscar
}

