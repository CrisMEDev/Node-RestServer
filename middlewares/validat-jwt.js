const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: 'No se ha detectado un token en la petición'
        });
    }

    try {

        // Verifica si es un JWT válido y si es así se extrae el uid del user que hizo la petición
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Se coloca el uid en la request, como pasa por referencia ahora los otros
        // validators, middleware o controladores tendran acceso
        req.uid = uid;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }


}

module.exports = {
    validarJWT
}
