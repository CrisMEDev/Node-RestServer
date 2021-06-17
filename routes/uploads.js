const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagenDeColeccion } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar-campos');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

// Por estandar se usara un post para crear un archivo; por lo general put es para actualizar

// Endpoint para cargar archivo
router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'No es un id de base de datos').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ), // c es el param que se recibe en el put
    validarCampos
], actualizarImagenDeColeccion );


module.exports = router;
