
export const intialState = async () => {

    try {

        global.customer.removeAttribute('id');
        global.info_secuencia.removeAttribute('id');
        global.parametro.removeAttribute('id');
        global.sale.removeAttribute('id');
        global.stock.removeAttribute('id');

        const { NumSecuenciaP, FechaSecuenciaP } = (await global.parametro.findOne()).dataValues;

        const existeEnInfoSecuencia = await global.info_secuencia.findOne({ where: { num_secuencia: NumSecuenciaP } });
        if (!existeEnInfoSecuencia) { // si no existe en la tabla
            await global.info_secuencia.create({
                num_secuencia: NumSecuenciaP,
                fecha: FechaSecuenciaP,
                informado: 'N',
                cant_clientes: await global.customer.count({ where: { informado: 'N' } }),
                monto_venta: await global.sale.sum('totalPacksAmount', { where: { informado: 'N' } }) || 0,
                cant_facturas: await global.sale.count({ where: { informado: 'N' } }) || 0,
                cant_paquetes: await global.sale.sum('quantityOfPacks', { where: { informado: 'N' } }) || 0
            })

            await global.customer.update({ secuencia: NumSecuenciaP }, { where: { informado: 'N' } })
        }

    } catch (error) {
        console.log(error);
        
    }


};