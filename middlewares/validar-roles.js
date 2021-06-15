const { request, response } = require("express")

// Solo admite la operación para el ADMIN_ROLE
const esAdminRole = (req = request, res = response, next) => {

    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, nombre } = req.usuario

    if ( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${nombre} no es administrador - Imposible realizar operación`
        });
    }

    next();
}

// Solo admite la operación para un arreglo de roles
const tieneRol = ( ...roles ) => {
    return (req = request, res = response, next) => {
        if ( !req.usuario ){    // Tiene que se un usaurio logeado
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        // Solo acepta uno de los role que hay en ...roles
        if ( !roles.includes( req.usuario.role ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            });
        }

        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRol
}

