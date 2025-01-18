const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        frame: false,
        titleBarStyle: 'hidden',
        backgroundColor: '#f8fafc', // VS Code-like dark background
        icon: path.join(__dirname, './row.png'),
    });

    win.loadFile('renderer/index.html');

    // Optional: Open DevTools (comment out for production)
    // win.webContents.openDevTools();

    win.on('maximize', () => {
        win.webContents.send('window-maximized');
    });

    win.on('unmaximize', () => {
        win.webContents.send('window-unmaximized');
    });

    // Handle window control events from renderer
    ipcMain.on('minimize-window', () => win.minimize());
    ipcMain.on('maximize-window', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });
    ipcMain.on('close-window', () => win.close());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});