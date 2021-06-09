const Usuario = require('../models/usuario');
const Role = require('../models/role');

// Verificar si el rol es valido y parte de la BD
const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({ role });
    if ( !existeRol ){
        // Este throw no revienta la aplicación, lo atrapa el custom par amanejarlo como los otros check
        throw new Error(`El rol ${ role } no está registrado en la base de datos`);
    }
}


const emailExiste = async(correo = '') => {

    // Verificar si el correo existe
    const emailExist = await Usuario.findOne({ correo });
    if ( emailExist ){
        throw new Error(`El correo ${correo} ya está registrado, intenta con otro correo`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste
}
