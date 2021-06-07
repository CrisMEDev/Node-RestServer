// {
//     nombre: '',
//     correo: '',
//     pass: '',       // Encriptado
//     img: '',
//     role: '',
//     estado: false,  // Eliminado para los usuarios pero no de la base de datos
//     google: true,   // Para saber si el usuario fue creado por google o el sistema propio del backend
// }

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']    // El segundo es el mensaje de error que será mostrado en caso falte el nombre
        },
        
        correo: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true
        },

        pass: {
            type: String,
            required: [true, 'La contraseña es obligatoria']
        },       // Encriptado

        img: {
            type: String
        },

        role: {
            type: String,
            required: true,
            enum: ['ADMIN_ROLE', 'USER_ROLE']
        },

        estado: {
            type: Boolean,
            default: true
        },  // Eliminado para los usuarios pero no de la base de datos

        google: {
            type: Boolean,
            default: false
        },   // Para saber si el usuario fue creado por google o el sistema propio del backend
});


module.exports = model( 'Usuario', UsuarioSchema );

