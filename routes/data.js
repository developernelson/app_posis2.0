const { Router } = require('express');
const { clientes, ventas, stock, historial, actualizar, descargar, secuencia, enviar} = require('../controllers/data');
const { authentication } = require('../middleware/authentication');
const router = new Router();

router.get('/clientes', authentication, clientes);

router.get('/ventas', authentication, ventas);
router.get('/stock', authentication, stock);
router.get('/historial', authentication, historial);

router.get('/actualizar', authentication, actualizar);
router.get('/enviar', authentication, enviar);

router.get('/descargar', authentication, descargar); // muestra la vista para descargar
router.get('/secuencia', authentication, secuencia);


module.exports = router;