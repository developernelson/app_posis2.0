const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {

    const {nombre, correo, contraseña, contraseña1, contraseña2, codigo_empresa } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        if(req.url === '/register'){
            return res.render('register', { errors: errors.errors, nombre, correo, contraseña1, contraseña2 });
        }else{
            return res.render('login', { errors: errors.errors, correo, contraseña, codigo_empresa });
        }
    }

    next();
}

module.exports = {
    validarCampos
}