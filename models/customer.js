const { DataTypes } = require('sequelize');
import { sequelize } from "../database";

export const Customer =  () => global.sequelize.define('Customer', {

    EZDCode: DataTypes.STRING,
    POSCode: DataTypes.STRING,
    movementCode: DataTypes.STRING,
    legalName: DataTypes.STRING,
    aux1: DataTypes.STRING,
    street: DataTypes.STRING,
    streetNumber: DataTypes.NUMBER,
    storeNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    betweenStreets: DataTypes.STRING,
    aux3: DataTypes.STRING,
    taxID: DataTypes.STRING,
    taxCategory: DataTypes.STRING,
    visitFrequency1: DataTypes.STRING,
    visitFrequency2: DataTypes.STRING,
    visitFrequency3: DataTypes.STRING,
    visitFrequency4: DataTypes.STRING,
    visitFrequency5: DataTypes.STRING,
    visitFrequency6: DataTypes.STRING,
    visitFrequency7: DataTypes.STRING,
    EZDSalesmanCode: DataTypes.STRING,
    channelCode: DataTypes.STRING,
    locationCode: DataTypes.STRING,
    XCoordinate: DataTypes.STRING,
    YCoordinate: DataTypes.STRING,
    Informado: DataTypes.STRING,
    Secuencia: DataTypes.STRING,

    
},{
    tableName: 'customer',
    timestamps: false,
});

// Customer.removeAttribute('id');