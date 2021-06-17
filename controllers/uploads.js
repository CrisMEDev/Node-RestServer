const { request, response } = require('express');
const { subirArchivo } = require('../helpers/');


const cargarArchivo = async( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No se hay archivos para subir'});
        return;
    }

    const nombreImagen =  await subirArchivo( req.files );

    res.json({ nombreImagen });

}


module.exports = {
    cargarArchivo
}

