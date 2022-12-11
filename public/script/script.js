function handleCloseMessage(closeIcon) {

   document.querySelector('.message').classList.add('hidden');
}

function handleSendData() {
   document.querySelector('.uploading').style.display = "block";
}

function handleUpdateData() {
   document.querySelector('.update').style.display = "block";
}

function getFile() {
   handleUpdateData();
   const nroSec = document.querySelector('.input-secuencia').value;
   
   // obtengo la url del servidor donde se encuentra la aplicación desplegada
   // Ejemplo: 'https://maxicosfeposis.heroku.org/data/'
   const loc = window.location.href.split('descargar');
  
   fetch(`${loc[0]}/secuencia?nroSec=${nroSec}`)
      .then((response) => response.json())
      .then(json => {
         document.querySelector('.update').style.display = "none";
         if (json) {
            document.querySelector('.mensaje-secuencia').classList.add('mensaje-none');
            return downloadTextFile(JSON.stringify(json), `${nroSec}.json`);
         }
         noExisteSecuencia(nroSec);
      })
      .catch(err => console.log('Solicitud fallida', err));

}


function downloadTextFile(text, name) {
   const a = document.createElement('a');
   const type = name.split(".").pop();
   a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }));
   a.download = name;
   a.click();
}

function noExisteSecuencia(nroSec) {

   const parrafo = document.querySelector('.mensaje-secuencia')
   parrafo.classList.remove('mensaje-none');

   if (nroSec) {
      parrafo.innerHTML = `El N° de secuencia ${nroSec} no existe`;
   } else {
      parrafo.innerHTML = `Ingrese un N° de secuencia`;
   }

}

function enterPress(event) {

   if (event.key === "Enter") {
      document.querySelector('.btn-secuencia').focus()
   }
}
