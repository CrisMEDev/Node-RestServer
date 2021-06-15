const { Router, request, response } = require('express');
const { check } = require('express-validator');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto
} = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRol, esAdminRole } = require('../middlewares');


const router = Router();

/*
** {{url}}/api/productos
*/

// Obtener los productos
router.get('/', obtenerProductos);

// Obtener producto por id
router.get('/:id', [
    check('id', 'No es un id de producto válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto);

// Crear producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de producto es obligatorio').not().isEmpty(),
    tieneRol('ADMIN_ROLE', 'VENTA_ROLE'),
    check('categoria', 'El id especificado no es válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
], crearProducto);

// Actualizar producto
router.put('/:id', [
    validarJWT,
    check('id', 'El id especificado no es válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto);

// Borrar producto
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id especificado no es válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto);


module.exports = router;

