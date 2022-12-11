
export const formatStock = (stock) => {

    if (stock.length > 0) {
        return stock.map(({ dataValues }) => {
            const {Informado, ...rest} = dataValues;
            return rest;
        })
    } else {
        return stock;
    }
}


