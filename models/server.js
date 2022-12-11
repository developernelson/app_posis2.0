const express = require('express');
const cors = require('cors')
import { firebase } from '../firebase/config-firebase';

export default class Server {
    constructor() {
        this.app = express();
        this.appFirebase = firebase();
        this.paths = {
            home: '/',
            auth: '/auth',
            data: '/data',
            noFound: '/*'

        }
        // setting
        this.setting();
        this.middleware();
        this.routes();

    }
    // End constructor

    setting() {
        this.app.set('port', process.env.PORT || 4000);
    }

    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Servidor escuchado el puerto: ${this.app.get('port')}`);
        })
    }

    middleware() {

        // setting files statics
        this.app.use(express.static('public'));
        this.app.use(cors());
        // la info que viene hacia el backend viene desde un json
        this.app.use(express.json());

        // setting template engine
        this.app.set('view engine', 'ejs');

        this.app.use(express.urlencoded({
            extended: true,
        })
        );
    }

    routes() {
        this.app.use(this.paths.home, require('../routes/home'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.data, require('../routes/data'));
        this.app.use(this.paths.noFound, require('../routes/noFound'));

    }


}

