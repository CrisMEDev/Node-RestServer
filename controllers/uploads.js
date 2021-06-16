const path = require('path');
const { request, response } = require('express');


const cargarArchivo = async( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No se hay archivos para subir'});
        return;
    }

    const { archivo } = req.files;

    const uploadPath = path.join( __dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) { return res.status(500).json({ err }); }

        res.json('Archivo subido en: ' + uploadPath);
    });

}


module.exports = {
    cargarArchivo
}

