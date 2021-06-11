const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const login = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            });
        }

        // Verificar si está activo en la BD
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.pass );
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            });
        }

        // Generar JWT

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal, contacte a su administrador'
        });
    }

    res.json({
        correo,
        password
    });

}

module.exports = {
    login
}

