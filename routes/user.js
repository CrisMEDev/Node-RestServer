
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
} = require('../middlewares'); // Importa el archivo index de la carpeta middlewares

const { esRoleValido, emailExiste, usuarioByIdExiste } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/user');

const router = Router();

// Se pasa la referencia del controller correspondiente en cada petición
router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),  // check también reconoce los paramatros y no solo los segmentos
    check('id').custom( usuarioByIdExiste ),
    // Para forzar un rol correcto, inconveniente es que puede que no se requiera actualizar el rol
    check('role').custom( esRoleValido ),
    validarCampos
], usuariosPut ); // Se agrega el parametro de segmento id

router.post('/', [  // Se enviarán los middlewares necesarios para validar datos
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),  // Se revisa el campo nombre para que contenga un valor
    // Se revisa el campo password para que contenga un valor y tenga al menos 6 caracteres
    check('password', 'El password es obligatorio y mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),    // Se revisa el campo correo para que contenga uno válido
    check('correo').custom( emailExiste ),    // Se revisa el campo correo para ver si ya está registrado

    // check('role', 'No es un rol permitido').isIn([
    //     'ADMIN_ROLE',
    //     'USER_ROLE'
    // ]),      // Se revisa el role para que sea válido
    check('role').custom( esRoleValido ),

    validarCampos   // Si el middleware creado pasa las validaciones, ejecuta el controlador

], usuariosPost );

router.delete('/:id', [
    validarJWT,
    // esAdminRole,    // Solo para aplicarse al admin role
    tieneRol('ADMIN_ROLE', 'VENTA_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),  // check también reconoce los paramatros y no solo los segmentos
    check('id').custom( usuarioByIdExiste ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );







module.exports = router;
