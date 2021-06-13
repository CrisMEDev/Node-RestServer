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
            default: 'USER_ROLE'
            //enum: ['ADMIN_ROLE', 'USER_ROLE']     
            // Despues de validar el rol contra la base de datos, el enum no es requerido
            // de dejarse en este objeto, se le dará prioridad a estos y cualquier otro rol en la base de datos no será válido
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

UsuarioSchema.methods.toJSON = function(){

    // Genera una instancia de mi Schema con sus valores respectivos
    const { __v, pass, _id, ...user } = this.toObject(); // Saca la version y el password de mi objeto Schema y el resto lo deja en user

    user.uid = _id;

    return user;
}


module.exports = model( 'Usuario', UsuarioSchema );

