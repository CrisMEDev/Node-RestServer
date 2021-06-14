const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleLogin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Se pasa la referencia del controller correspondiente en cada petición
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check('id_token', 'Token es obligatorio').not().isEmpty(),
    validarCampos
], googleLogin );



module.exports = router;
