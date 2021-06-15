const { Usuario,
        Role,
        Categoria
} = require('../models');

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

const usuarioByIdExiste = async( id ) => {

    // Verificar si el id existe
    const usuarioExiste = await Usuario.findById( id );
    if ( !usuarioExiste ){
        throw new Error(`El id ${id} no existe, intenta con un id válido`);
    }
}

const existeCategoria = async( id ) => {

    const categoriaExiste = await Categoria.findById( id );

    if ( !categoriaExiste ){
        throw new Error(`El id ${id} no existe, intenta con un id válido`);
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    usuarioByIdExiste,
    existeCategoria
}
