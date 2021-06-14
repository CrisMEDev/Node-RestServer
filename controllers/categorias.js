const { response, request } = require('express');
const { Categoria } = require('../models');

const crearCategoria = async( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaEnDB = await Categoria.findOne({ nombre })

    if ( categoriaEnDB ){
        return res.status(400).json({
            msg: `La categoria ${ nombre } ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id    // Se toma del token y se reciben tal cual mongo los maneja
    }

    const categoria = await new Categoria( data );

    // Guardar en db
    await categoria.save();

    res.status(201).json({
        categoria
    });
}

module.exports = {
    crearCategoria
}

