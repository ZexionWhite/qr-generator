const QRCode = require('qrcode');
const { shell } = require('electron');
const path = require('path');

// Variables de fecha, para construir un archivo con nombre dinamico.
const fechaActual = new Date();
const año = fechaActual.getFullYear();
const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
const dia = fechaActual.getDate().toString().padStart(2, '0');
const hora = fechaActual.getHours().toString().padStart(2, '0');
const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
const nombreArchivo = `qr_${año}${mes}${dia}_${hora}${minutos}${segundos}`;

function generateQR() {
    const url = document.getElementById('qrURL').value.trim();
    const normal = document.getElementById('normal');
    const hq = document.getElementById('highQuality');
    const ultraHQ = document.getElementById('ultraHighQuality');
    let size 

    if (url === '') {
        return;
    } else if ( normal.checked) {
        size = 512;
    } else if ( hq.checked) {
        size = 1024;
    } else if ( ultraHQ.checked) {
        size = 30;
    }

    QRCode.toFile(`./qr/${nombreArchivo}.png`, url, {
      color: {
        dark: '#000000', // Color del código
        light: '#FFFFFF' // Fondo blanco
      },
      width: size
    }, function (err) {
      if (err) throw err;
      console.log('🎉 QR generado' +  nombreArchivo);

      const qrPreview = document.getElementById('qrPreview');
      qrPreview.src = `./qr/${nombreArchivo}.png`;

    });
}

const generatorButton = document.getElementById('generator');
generatorButton.addEventListener('click', generateQR);

const viewFolderButton = document.getElementById('viewFolder');
viewFolderButton.addEventListener('click', () => {
  const qrFolderPath = path.join(__dirname, 'qr');
  shell.openPath(qrFolderPath);
});
