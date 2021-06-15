// Para tener una mejor ayuda del editor al usar las funciones de express se usa la siguiente linea
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // TODO: Faltaría implementar una validación en caso de que el query param sea uns string y no un number

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    // Para ejecutar las promesas en simultaneo
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),

        Usuario.find(query)          // Solo devuelve el estado en true
        .skip(Number(desde))         // Registro en el que empieza
        .limit(Number(limite))      // Cuantos registros tomará
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req = request, res = response) => {

    // Tambien se puede desestructurar el elemento:     const { id } = req.params
    const id = req.params.id;   // Se obtiene el parametro de segmento id definido en la route a put
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(201).json({
        usuario
    });
}

const usuariosPost = async(req = request, res = response) => {

    const { nombre, correo, password, role } = req.body;  // Se obtiene la respuesta del posteo
    const usuario = new Usuario({ nombre, correo, pass: password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync( password, salt );

    // Guardar registro en BD
    await usuario.save();
    
    res.json({
        usuario
    });
}

const usuariosDelete = async(req = request, res = response) => {
    
    const { id } = req.params;

    // Borrar usuario fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );


    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    
    res.json({
        usuario,
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API desde el controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
