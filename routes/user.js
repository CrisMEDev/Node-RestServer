
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
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
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),  // Se revisa el campo nombre para que contenga un valor
    // Se revisa el campo password para que contenga un valor y tenga al menos 6 caracteres
    check('password', 'El password es obligatorio y mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),    // Se revisa el campo correo para que contenga uno válido
    check('role', 'No es un rol permitido').isIn([
        'ADMIN_ROLE',
        'USER_ROLE'
    ]),      // Se revisa el role para que sea válido

    validarCampos   // Si el middleware creado pasa las validaciones, ejecuta el controlador

], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/', usuariosDelete );






module.exports = router;
