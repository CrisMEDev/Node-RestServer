const { response, request } = require('express');
const { Categoria } = require('../models');

// obtenerCategorias; paginado, total, populate
const obtenerCategorias = async( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // TODO: Faltaría implementar una validación en caso de que el query param sea uns string y no un number
    
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),

        Categoria.find(query)
        .populate('usuario', ['nombre', 'correo'])  // Se manda la referencia a usuario para mostrar el nombre y el correo
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        total,
        categorias
    });
}


const obtenerCategoria = async( req = request, res = response ) => {

    const id = req.params.id;

    const categoria = await Categoria.findById( id ).populate('usuario');

    res.json({
        categoria
    });
}


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

// Actualizar categoria
const actualizarCategoria = async( req = request, res = response ) => {

    const id = req.params.id;
    const { estado, usuario, ...data } = req.body   // Se ignorará el resto de los parametros del body

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id    // Actualiza la categoria con el id del administrador que la cambió

    const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true}); // new: true es para devolver el documento actualizado

    res.status(200).json({
        categoria
    });
}

// Borrar categoria
const borrarCategoria = async( req = request, res = response ) => {

    const id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.status(200).json({
        categoria
    });
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}

