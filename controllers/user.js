// Para tener una mejor ayuda del editor al usar las funciones de express se usa la siguiente linea
const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API desde el controlador'
    });
}

const usuariosPut = (req, res = response) => {
    res.status(400).json({                  // Errores cuatrocientos indican que el usuario realizó mal la peticion desde el frontend
        msg: 'put API desde el controlador'
    });
}

const usuariosPost = (req, res = response) => {
    res.status(201).json({                  // Errores doscientos indican peticiones realizadas correctamente
        msg: 'post API desde el controlador'
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
