const { DataTypes } = require('sequelize');
import { sequelize } from "../database";

export const Sale = () => global.sequelize.define('Sale', {

    sequenceNumber: DataTypes.NUMBER,
    documentNumber: DataTypes.NUMBER,
    documentDate: DataTypes.STRING,
    EZDCode: DataTypes.STRING,
    branchCode: DataTypes.STRING,
    POSCode: DataTypes.STRING,
    product: DataTypes.STRING,
    salesType: DataTypes.STRING,
    quantityOfPacks: DataTypes.NUMBER,
    totalPacksAmount: DataTypes.NUMBER,
    Informado: DataTypes.STRING,

}, {
    tableName: 'sales',
    timestamps: false

});

// Sale.removeAttribute('id');