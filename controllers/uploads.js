const path = require('path');
const fs = require('fs');

const { request, response } = require('express');

const { subirArchivo } = require('../helpers/');
const { Usuario, Producto } = require('../models');


const cargarArchivo = async( req = request, res = response ) => {

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

const actualizarImagenDeColeccion = async( req = request, res = response ) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if (!modelo) { return res.status(400).json({msg: `No existe un usuario con el id ${id}`}); }
            
            break;

        case 'productos':
            modelo = await Producto.findById( id );
            if (!modelo) { return res.status(400).json({msg: `No existe un producto con el id ${id}`}); }
    
            break;

        default:
            res.status(500).json({ msg: 'Olvide validar esto' });
    }

    // Limpiar imagenes anteriores
    if ( modelo.img ){
        const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img );

        if ( fs.existsSync( pathImg ) ){    // Borrar imagen si aun existe
            fs.unlinkSync( pathImg );
        }
    }


    // Almacenar imagen en base de datos y server
    const nombreImagen =  await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombreImagen;

    await modelo.save();

    res.json( modelo );

}

const mostrarImagen = async( req = request, res = response ) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if (!modelo) { return res.status(400).json({msg: `No existe un usuario con el id ${id}`}); }
            
            break;

        case 'productos':
            modelo = await Producto.findById( id );
            if (!modelo) { return res.status(400).json({msg: `No existe un producto con el id ${id}`}); }
    
            break;

        default:
            res.status(500).json({ msg: 'Olvide validar esto' });
    }

    // Limpiar imagenes anteriores
    if ( modelo.img ){
        const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img );

        if ( fs.existsSync( pathImg ) ){    // Responder con la imagen si aun existe
            return res.sendFile( pathImg )
        }
    }

    res.sendFile( path.join( __dirname, '../assets', 'no-image.jpg' ) );

}


module.exports = {
    cargarArchivo,
    actualizarImagenDeColeccion,
    mostrarImagen
}

