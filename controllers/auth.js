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
        const { nombre, correo, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            // Crear usuario
            const data = {
                nombre,
                correo,
                pass: ':D',
                img,
                google: true
            }

            usuario = new Usuario( data );

            await usuario.save();
        }

        // Si el usuario en DB fue inhabiliado por alguna razón
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
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
        res.status(400).json({
            msg: 'El token de google no es válido'
        });
    }


}

module.exports = {
    login,
    googleLogin
}

