const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 820,
        height: 620,
        resizable: false,
        maximizable: false,
        icon: path.join(__dirname, 'resources', 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
});

    win.loadFile('index.html');
    win.setMenuBarVisibility(false);
    win.setAutoHideMenuBar(true);

}

app.whenReady().then(createWindow);

//Cerrar la app en windows
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});
  
// Si la app está activada (en MacOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});