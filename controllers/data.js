import { response } from "express";
const fs = require("fs");

import { formatCustomers, formatHistorial, formatSales, formatStock } from '../database'
import { fetchDataPost, getStatusMessage, intialState, getJson } from '../helpers'

// CLIENTES
export const clientes = async (req, res = response) => {

    const displayName = req.displayName;

    try {

        const { num_secuencia } = await global.info_secuencia.findOne({ where: { informado: 'N' } }) || { num_secuencia: '' };
        const customersSinFormato = await global.customer.findAll({ where: { informado: 'N' } });
        const customers = formatCustomers(customersSinFormato);

        res.render('customers', { customers, num_secuencia, displayName, empresa: global.cod_emp });

    } catch (error) {
        console.log(error);
        res.render('index', { message: error.message, msgType: 'danger', displayName, empresa: global.cod_emp });
    }

}

// VENTAS
export const ventas = async (req, res = response) => {

    const displayName = req.displayName;

    try {

        const { cant_paquetes, cant_facturas, monto_venta } = await global.info_secuencia.findOne({ where: { informado: 'N' } }) || { cant_paquetes: 0, cant_facturas: 0, monto_venta: 0 };
        const salesSinFormato = await global.sale.findAll({ where: { informado: 'N' } });
        const sales = formatSales(salesSinFormato);

        res.render('sales', { sales, cant_paquetes, cant_facturas, monto_venta, displayName, empresa: global.cod_emp });

    } catch (error) {
        console.log(error);
        res.render('index', { message: error.message, msgType: 'danger', displayName, empresa: global.cod_emp });
    }


}

// STOCK
export const stock = async (req, res = response) => {

    const displayName = req.displayName;

    try {

        const stockSinFormato = await global.stock.findAll({ where: { informado: 'N' } });
        const stock = formatStock(stockSinFormato);
        res.render('stock', { stock, displayName, empresa: global.cod_emp });

    } catch (error) {
        console.log(error);
        res.render('index', { message: error.message, msgType: 'danger', displayName, empresa: global.cod_emp });
    }

}

// HISTORIAL DE SECUENCIAS ENVIADAS
export const historial = async (req, res = response) => {
    const displayName = req.displayName;

    try {
        const historialSinFormato = await global.info_secuencia.findAll({
            order: [
                ['num_secuencia', 'DESC']
            ]
        });

        const historial = formatHistorial(historialSinFormato);

        res.render('historial', { historial, displayName, empresa: global.cod_emp });


    } catch (error) {
        console.log(error);
        res.render('index', { message: error.message, msgType: 'danger', displayName, empresa: global.cod_emp });
    }
}

// ACTUALIZAR/RECRAGAR SECUENCIA
export const actualizar = async (req, res = response) => {

    const { NumSecuenciaP,Informado } = (await global.parametro.findOne()).dataValues;

    if(Informado === 'N'){
        await global.info_secuencia.destroy({where : {num_secuencia: NumSecuenciaP}})
        await intialState();
    }

    res.redirect('/');
}

// VISTA DE DESCARGAR SECUENCIA
export const descargar = async (req, res = response) => {

    const displayName = req.displayName;

    res.render('descargar', { descargar: true,  displayName, empresa: global.cod_emp });

}

// DESCARGAR LA SECUENCIA
export const secuencia = async (req, res = response) => {

    const { nroSec } = req.query;
    const json = await getJson(nroSec);
    res.send(json);

}

// ENVIAR DATA
export const enviar = async (req, res = response) => {

    const displayName = req.displayName;
    let { NumSecuenciaP } = await global.parametro.findOne();
    let { informado } = await global.info_secuencia.findOne({ where: { num_secuencia: NumSecuenciaP } });

    if (informado === 'S') {
        return res.redirect('/');
    }

    try {

        const [customersSinFormato, salesSinFormato, stockSinFormato] = await Promise.all([
            global.customer.findAll({ where: { informado: 'N' } }),
            global.sale.findAll({ where: { informado: 'N' } }),
            global.stock.findAll({ where: { informado: 'N' } })
        ])

        // option = 1 identifica que a las ventas al valor de totalPacksAmount se le coloca un '_' al inicio de
        // para que luego coincida con el patron de expresion regular y poder modificar el json

        const customer = formatCustomers(customersSinFormato);
        let sales = formatSales(salesSinFormato, 1);
        const stock = formatStock(stockSinFormato);

        // Genero el JSON segun documentacion de API
        let data = { customer, sales, stock };
       
        // Genero el archivo JSON jsonData.json
        // let data_json = JSON.stringify(data);
        // const regex = /"_(-|)([0-9]+(?:\.[0-9]+)?)"/g
        // data_json = data_json.replace(regex, '$1$2')
        // fileUpload(data_json, NumSecuenciaP.toString());
        // fs.writeFileSync('jsonData.json', data_json );

        // Envio los datos de la secuencia y verifico la respuesta
        const response = await fetchDataPost(data, NumSecuenciaP);
        const result = await response.json();

        // Invalid Client 
        if (result.error) {
            throw new Error(result.error);
        }

        // verifico el estado de mensaje de la respuesta
        const message = getStatusMessage(result);

        if (message.msgType === 'success') {
            const { set, where } = { set: { Informado: 'S' }, where: { where: { Informado: 'N' } } };
            await global.customer.update(set, where);
            await global.sale.update(set, where);
            await global.stock.update(set, where);
            await global.parametro.update(set, where);
            await global.info_secuencia.update({ informado: 'S' }, { where: { informado: 'N' } });

            // persisto el json y genero la url de descarga
            // sales = formatSales(salesSinFormato);
            // data = { customer, sales, stock };
            // fileUpload(data, NumSecuenciaP.toString());

            message.message = 'No hay SECUENCIA pendiente de enviar.'
            message.msgType = 'info'

            return res.render('index', { alert: true, ...message, displayName, empresa: global.cod_emp });
        }

        res.render('index', { ...message, displayName, empresa: global.cod_emp });
        
    } catch (error) {
        console.log(error);
        res.render('index', { message: error.message, msgType: 'danger', displayName, empresa: global.cod_emp });
    }

}