const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo,
    actualizarImagenDeColeccion,
    mostrarImagen,
    actualizarImagenDeColeccionCloudinary,
    mostrarImagenCloudinary } = require('../controllers/uploads');
const { validarCampos, validarArchivoASubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

// Por estandar se usara un post para crear un archivo; por lo general put es para actualizar

// Endpoint para cargar archivo
router.post('/', validarArchivoASubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoASubir,
    check('id', 'No es un id de base de datos').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ), // c es el param que se recibe en el put
    validarCampos
], actualizarImagenDeColeccionCloudinary ); // actualizarImagenDeColeccion; controller para almacenamiento en local

router.get('/:coleccion/:id', [
    check('id', 'No es un id de base de datos').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ), // c es el param que se recibe en el put
    validarCampos
], mostrarImagenCloudinary);   // mostrarImagen; controller para mostrar imagen en local


module.exports = router;
