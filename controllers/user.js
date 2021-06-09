// Para tener una mejor ayuda del editor al usar las funciones de express se usa la siguiente linea
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    // Se obtienen los query params enviados desde la url, Ej: localhost:PORT/api/users?name=Cristian&name=Morales
    const { q, nombre = 'No name', apiKey } = req.query;

    res.json({
        msg: 'get API desde el controlador',
        q,
        nombre,
        apiKey
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

    res.status(400).json({                  // Errores cuatrocientos indican que el usuario realizó mal la peticion desde el frontend
        msg: 'put API desde el controlador',
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

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API desde el controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.status(500).json({                  // Errores quinientos indican algún problema desde el codigo del server
        msg: 'delete API desde el controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}
