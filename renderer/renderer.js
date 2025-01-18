const { ipcRenderer } = require('electron');

const minimizeBtn = document.getElementById('minimize-btn');
const maximizeBtn = document.getElementById('maximize-btn');
const closeBtn = document.getElementById('close-btn');
const maximizeIcon = maximizeBtn.querySelector('.maximize-icon');
const restoreIcon = maximizeBtn.querySelector('.restore-icon');

minimizeBtn.addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
});

maximizeBtn.addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
});

closeBtn.addEventListener('click', () => {
    ipcRenderer.send('close-window');
});

ipcRenderer.on('window-maximized', () => {
    maximizeIcon.classList.add('hidden');
    restoreIcon.classList.remove('hidden');
});

ipcRenderer.on('window-unmaximized', () => {
    maximizeIcon.classList.remove('hidden');
    restoreIcon.classList.add('hidden');
});