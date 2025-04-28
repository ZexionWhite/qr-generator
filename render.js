async function generateQR() {
    const url = document.getElementById('qrURL').value.trim();
    const normal = document.getElementById('normal');
    const hq = document.getElementById('highQuality');
    const ultraHQ = document.getElementById('ultraHighQuality');
    let size;
  
    if (url === '') {
      return;
    } else if (normal.checked) {
      size = 512;
    } else if (hq.checked) {
      size = 1024;
    } else if (ultraHQ.checked) {
      size = 3072;
    }
  
    const userDataPath = await window.electronAPI.getUserDataPath();
    const savePath = window.electronAPI.joinPath(userDataPath, 'qr');
  
    if (!window.electronAPI.existsSync(savePath)) {
      window.electronAPI.mkdirSync(savePath);
    }
  
    const fechaActual = new Date();
    const fileName = `qr_${fechaActual.getFullYear()}${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}${fechaActual.getDate().toString().padStart(2, '0')}_${fechaActual.getHours().toString().padStart(2, '0')}${fechaActual.getMinutes().toString().padStart(2, '0')}${fechaActual.getSeconds().toString().padStart(2, '0')}`;
    
    const fullPath = window.electronAPI.joinPath(savePath, `${fileName}.png`);
  
    await window.electronAPI.generateQR(fullPath, url, size);
  
    const qrPreview = document.getElementById('qrPreview');
    qrPreview.src = `file://${fullPath}`;
  }
  
  const generatorButton = document.getElementById('generator');
  generatorButton.addEventListener('click', generateQR);
  
  const viewFolderButton = document.getElementById('viewFolder');
  viewFolderButton.addEventListener('click', async () => {
    const userDataPath = await window.electronAPI.getUserDataPath();
    const savePath = window.electronAPI.joinPath(userDataPath, 'qr');
    window.electronAPI.openFolder(savePath);
  });
  