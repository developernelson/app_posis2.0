const fetch = require('node-fetch');
import 'dotenv/config';

export const fetchDataPost = (data, numeroSecuencia) => {
    
    // proceso de sacar las comillas del json en el campo totalPacksAmount
    let data_json = JSON.stringify(data);
    const regex = /"_(-|)([0-9]+(?:\.[0-9]+)?)"/g
    data_json = data_json.replace(regex, '$1$2')

    return fetch(process.env.URL_API_POST, {
        method: 'POST',
        body: data_json,
        headers: {
            'x-correlation-id': '39BDeF96-3309-e9a1-B9e9-B7Dc0D35768F',
            'Content-Type': 'application/json',
            'EZDCode': `${'process.env.EZD_CODE_'+ global.cod_emp}`,
            'branchCode': '001',
            'sequenceNumber': numeroSecuencia,
            'Accept': '*/*',
            'client_id': `${'process.env.CLIENT_ID_'+ global.cod_emp}`,
            'client_secret': `${'process.env.CLIENT_SECRET_'+ global.cod_emp}`
        },
    })
}  


   