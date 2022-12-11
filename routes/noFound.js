const { Router } = require('express');
const { getAuth } = require('firebase/auth');

const router = new Router();


// para rutas no coincidentes
router.get('*', (req, res) => {

    const auth = getAuth();
    if (auth.currentUser) {
        return res.redirect('/');
    }

    res.redirect('/auth/login');

})

module.exports = router;