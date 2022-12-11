export const formatSales = (sales, option = 0) => {

    if (sales.length > 0) {

        return (option === 1)
            ?
            sales.map(({ dataValues }) => {
                const { Informado, totalPacksAmount, documentNumber, ...rest } = dataValues;
                // formato ejemplo string dos decimales '-178.00' el guion es agregado para que coincida con una expresion regular mas adelante
                rest.totalPacksAmount = '_' + parseFloat(totalPacksAmount).toFixed(2);
                rest.documentNumber = Number(documentNumber);
                return rest;
            })
            :
            sales.map(({ dataValues }) => {
                const { Informado, totalPacksAmount,  documentNumber, ...rest } = dataValues;
                rest.totalPacksAmount = Number(totalPacksAmount);
                rest.documentNumber = Number(documentNumber);
                return rest;
            })



    } else {
        return sales;
    }
}
