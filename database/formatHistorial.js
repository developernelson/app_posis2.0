
export const formatHistorial = (historial) => {

    if (historial.length > 0) {

        return historial.map(({ dataValues}) => {
                dataValues.informado = (dataValues.informado === 'N') ? 'NO' : 'SI' 
                return dataValues
            });

    } else {
        historial;
    }
}



