const { Router } = require('express');
const { check } = require('express-validator');
const { authLogin, authLogout, authLoginStart, authRegister, authRegisterStart } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');
import {codigosEmpresa} from '../helpers'
const router = new Router();


router.get('/login', authLogin);

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    check('codigo_empresa', 'El código de la empresa es obligatorio').not().isEmpty(),
    check('codigo_empresa', 'El código de Empresa no Existe!.').custom((value) => (codigosEmpresa.includes(value))),
    validarCampos
], authLoginStart);


router.get('/register', authRegister);

router.post('/register',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña1', 'La contraseña es obligatoria').not().isEmpty(),
    check('contraseña1', 'La contraseña debe ser mayor a 5 caracteres').isLength({min : 5}),
    check('contraseña2', 'Las contraseñas no coinciden.').custom((value, {req}) => {
        if(value !== req.body.contraseña1) {
         return false;
        }
        return true;
     }),
    validarCampos
], authRegisterStart);

router.get('/logout', authLogout);

module.exports = router;