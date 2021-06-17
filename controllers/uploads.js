const { request, response } = require('express');
const { subirArchivo } = require('../helpers/');


const cargarArchivo = async( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No se hay archivos para subir'});
        return;
    }

    try {

        // Mueve el archivo cargado a el directorio uploads/textos en la raiz del proyecto, si no existe el directorio, lo crea
        // const nombreImagen =  await subirArchivo( req.files, [ 'txt', 'pdf' ], 'textos' );

        // Mueve el archivo cargado a el directorio uploads en la raiz del proyecto
        const nombreImagen =  await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombreImagen });
    } catch (msg) {
        res.status(400).json({ msg })
    }



}


module.exports = {
    cargarArchivo
}

