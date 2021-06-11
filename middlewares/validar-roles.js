const { request, response } = require("express")


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

module.exports = {
    esAdminRole
}

