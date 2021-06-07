// Para tener una mejor ayuda del editor al usar las funciones de express se usa la siguiente linea
const { response, request } = require('express');

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

const usuariosPut = (req, res = response) => {

    // Tambien se puede desestructurar el elemento:     const { id } = req.params
    const id = req.params.id;   // Se obtiene el parametro de segmento id definido en la ruta put

    res.status(400).json({                  // Errores cuatrocientos indican que el usuario realizó mal la peticion desde el frontend
        msg: 'put API desde el controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;  // Se obtiene la respuesta del posteo
    
    res.status(201).json({                  // Errores doscientos indican peticiones realizadas correctamente
        msg: 'post API desde el controlador',
        nombre,
        edad
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