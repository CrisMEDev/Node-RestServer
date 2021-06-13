const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal, contacte a su administrador'
        });
    }

}

const googleLogin = async( req = request, res = response ) => {

    const { id_token } = req.body;

    try { 
        const googleUser = await googleVerify( id_token );
        console.log(googleUser);

        res.json({
            msg: 'Todo OK, google sign in',
            googleUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El token de google no es válido'
        });
    }


}

module.exports = {
    login,
    googleLogin
}

