
import Server from './models/server';
require('dotenv').config();

// Variable global que representa la Empresa elegida por el usuario
global.cod_emp;
global.sequelize;
global.info_secuencia;
global.customer;
global.parametro;
global.sale;
global.stock;


const server = new Server();

server.listen();
