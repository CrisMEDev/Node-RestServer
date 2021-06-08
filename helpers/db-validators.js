const Role = require('../models/role');

const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({ role });
    if ( !existeRol ){
        // Este throw no revienta la aplicación, lo atrapa el custom par amanejarlo como los otros check
        throw new Error(`El rol ${ role } no está registrado en la base de datos`);
    }
}


module.exports = {
    esRoleValido
}
