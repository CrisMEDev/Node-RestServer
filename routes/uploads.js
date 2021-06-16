const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Por estandar se usara un post para crear un archivo; por lo general put es para actualizar

// Endpoint para cargar archivo
router.post('/', cargarArchivo);


module.exports = router;
