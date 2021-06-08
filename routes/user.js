
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/user');

const router = new Router();

// Se pasa la referencia del controller correspondiente en cada petición
router.get('/', usuariosGet );

router.put('/:id', usuariosPut ); // Se agrega el parametro de segmento id

router.post('/', [  // Se enviarán los middlewares necesarios para validar datos
    check('correo', 'El correo no es válido').isEmail(),    // Se revisa el campo correo para que contenga uno válido
], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/', usuariosDelete );






module.exports = router;
