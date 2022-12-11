export const formatCustomers = (customers) => {

    if (customers.length > 0) {

        return customers.map(({ dataValues }) => {

            const {
                Secuencia,
                Informado,
                visitFrequency1,
                visitFrequency2,
                visitFrequency3,
                visitFrequency4,
                visitFrequency5,
                visitFrequency6,
                visitFrequency7,
                ...rest

            } = dataValues;

            const visitas = visitFrequency1 + visitFrequency2 + visitFrequency3 + visitFrequency4 + visitFrequency5 + visitFrequency6 + visitFrequency7;
            
            const reg1 = /1/g;
            const reg2 = /0/g;
            rest.visitFrequency = visitas.replace(reg1, 'X').replace(reg2, ' ');
           
            // ver corregir desde tabla
            rest.streetNumber = Number(rest.streetNumber);
            return rest;
        })

    } else {
        return customers;
    }


}