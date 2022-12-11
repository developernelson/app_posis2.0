const { DataTypes } = require('sequelize');

export const ParametroMx = () => global.sequelize.define('Parametro', {
    
    Cuit: DataTypes.STRING,
    RazonSocial: DataTypes.STRING,
    Domicilio: DataTypes.STRING,
    Localidad: DataTypes.STRING,
    Provincia: DataTypes.STRING,
    NumPosis: DataTypes.STRING,
    NumSecuenciaP: DataTypes.NUMBER,
    FechaSecuenciaP: DataTypes.DATE,
    NumPedido: DataTypes.NUMBER,
    Vendedor: DataTypes.STRING,
    FechaSecuenciaK: DataTypes.DATE,
    Informado: DataTypes.STRING,

}, {
    tableName: 'parametros',
    timestamps: false

});

export const ParametroVi_Mg = () => global.sequelize.define('Parametro', {
    
    Cuit: DataTypes.STRING,
    RazonSocial: DataTypes.STRING,
    Domicilio: DataTypes.STRING,
    Localidad: DataTypes.STRING,
    Provincia: DataTypes.STRING,
    NumPosis: DataTypes.STRING,
    NumSecuenciaP: DataTypes.NUMBER,
    FechaSecuenciaP: DataTypes.DATE,
    NumKraft: DataTypes.STRING,
    NumSecuenciaK: DataTypes.NUMBER,
    FechaSecuenciaK: DataTypes.DATE,
    Informado: DataTypes.STRING,

}, {
    tableName: 'parametros',
    timestamps: false

});

