
export const home = async (req, res) => {

    const { register, name } = req.query;
    const displayName = req.displayName;

    try {

        let message = '';
        const dataSecuencia = await global.info_secuencia.findOne({ where: { informado: 'N' } });
        if (dataSecuencia) {
            const { num_secuencia } = dataSecuencia.dataValues;
            message = `La SECUENCIA N°: ${num_secuencia} está pendiente de enviar.`
        } else {
            message = "No hay SECUENCIA pendiente de enviar.";
        }

        res.render('index', {message, msgType: 'info', displayName, register, name, empresa: global.cod_emp });

    } catch (error) {
        console.log(error);
        res.render('index', {message: 'Ha ocurrido un problema al leer la base de datos. Consulte con el administrador.', msgType: 'danger', displayName, register, name, empresa: global.cod_emp });
    }


}
