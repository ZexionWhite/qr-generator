const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

contextBridge.exposeInMainWorld('electronAPI', {
  getUserDataPath: () => ipcRenderer.invoke('get-user-data-path'),
  openFolder: (folderPath) => ipcRenderer.invoke('open-folder', folderPath),
  joinPath: (...args) => path.join(...args),
  existsSync: (pathToCheck) => fs.existsSync(pathToCheck),
  mkdirSync: (pathToCreate) => fs.mkdirSync(pathToCreate, { recursive: true }),
  generateQR: (filePath, url, size) => QRCode.toFile(filePath, url, {
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    width: size
  })
});
