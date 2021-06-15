const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria
} = require('../controllers/categorias');

const { validarJWT, validarCampos, tieneRol, esAdminRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

/*
** {{url}}/api/categorias
*/

// Obtener las categorias
router.get('/', obtenerCategorias );

// Obtener una categoria por id
router.get('/:id', [
    check('id', 'No es un id de categoria válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria);

// Crear nueva categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar un registro por id
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de categoria válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

// Borrar categoria - solo admin_role
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de categoria válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria);



module.exports = router;