const { Sequelize } = require('sequelize');
require('dotenv').config();

const db_connection = (cod_emp) => {
    switch (cod_emp) {
        case 'Ht_285':
            return {
                host: process.env.HOST_NAME_VI || "localhost",
                user: process.env.USER_NAME_VI || "root",
                password: process.env.PASSWORD_VI || "root",
                database: process.env.DATABASE_VI || "posis",
            }
            break;
        case 'Ve_984':
            return {
                host: process.env.HOST_NAME_MG || "localhost",
                user: process.env.USER_NAME_MG || "root",
                password: process.env.PASSWORD_MG || "root",
                database: process.env.DATABASE_MG || "posis",
            }
            break;
        case 'Fo_564':
            return {
                host: process.env.HOST_NAME_MX || "localhost",
                user: process.env.USER_NAME_MX || "root",
                password: process.env.PASSWORD_MX || "root",
                database: process.env.DATABASE_MX || "posis",
            }
            break;
        default:
            break;
    }

}


export const sequelizeConnection = (cod_emp) => {
    const db = db_connection(cod_emp);
    return new Sequelize(db.database, db.user, db.password, {
        host: db.host,
        dialect: 'mysql'
    });
}

