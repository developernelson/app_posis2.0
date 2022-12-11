import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { Info_Secuencia } from "../models/info_secuencia";

export const fileUpload = (file, name = 'sin_nombre') => {

    // Solicitamos el servicio de storage
    const storage = getStorage();

    try {

        // La referencia establece la ruta de acceso completa al archivo
        const secuenciaJsonRef = ref(storage, `secuencias/${name}.json`);

        // Create a reference to the file to delete
        // const desertRef = ref(storage, `secuencias/${Number(name) - 10}.json`);

        uploadString(secuenciaJsonRef, JSON.stringify(file))
            .then((snapshot) => {
                const { fullPath } = snapshot.metadata;
                getDownloadURL(ref(storage, fullPath))
                    .then((url) => {
                        Info_Secuencia.update({ url_secuencia: url }, { where: { num_secuencia: Number(name) } })
                    })
            });

        // Delete the file
        // deleteObject(desertRef);

    } catch (error) {
        console.log(error);
        throw error;
    }



}
