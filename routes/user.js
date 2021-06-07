
const { Router } = require('express');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/user');

const router = new Router();

// Se pasa la referencia del controller correspondiente en cada petición
router.get('/', usuariosGet );

router.put('/:id', usuariosPut ); // Se agrega el parametro de segmento id

router.post('/', usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/', usuariosDelete );






module.exports = router;
