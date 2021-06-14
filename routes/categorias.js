const { Router, response } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

/*
** {{url}}/api/categorias
*/

// Obtener las categorias - publico
router.get('/',( req, res ) => {
    res.json({
        msg: 'get'
    });
})

// Obtener una categoria por id - público
router.get('/:id',( req, res ) => {
    res.json({
        msg: 'get - id'
    });
})

// Crear nueva categoria - cualquier peersona con un token válido
router.post('/',( req, res ) => {
    res.json({
        msg: 'post'
    });
})

// Actualizar un registro por id - cualquier peersona con un token válido
router.put('/:id',( req, res ) => {
    res.json({
        msg: 'put'
    });
})

// Borrar categoria - solo admin_role
router.delete('/:id',( req, res ) => {
    res.json({
        msg: 'delete'
    });
})



module.exports = router;