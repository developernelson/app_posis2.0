const { Router } = require('express');
const { home } = require('../controllers/home');
const { authentication } = require('../middleware/authentication');
const router = new Router();

router.get('/', [
    authentication
], home);

module.exports = router;