
const { DataTypes } = require('sequelize');
import { sequelizeConnection } from "../database";

export const Info_Secuencia = () => global.sequelize.define('Info_Secuencia', {
        num_secuencia: DataTypes.SMALLINT,
        fecha: DataTypes.DATE,
        informado: DataTypes.STRING,
        cant_clientes: DataTypes.SMALLINT,
        monto_venta: DataTypes.DECIMAL,
        cant_facturas: DataTypes.SMALLINT,
        cant_paquetes: DataTypes.MEDIUMINT,
        url_secuencia: DataTypes.STRING,
    
    }, {
        tableName: 'info_secuencia',
        timestamps: false,
        freezeTableName: true
    
    });


// Info_Secuencia.removeAttribute('id');