const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow
let loginWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
    },
    titleBarOverlay: {
      height: 35,
      color: '#282c34',
      symbolColor: '#fff'
    }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}
function createLoginWindow(){
  loginWindow = new BrowserWindow({
    width: 1240,
    height: 800,
    minWidth: 1050,
    minHeight: 650,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,

    },
    titleBarOverlay: {
      height: 35,
      color: '#222b33',
      symbolColor: '#fff'
    }
  })

  if (isDev) {
    loginWindow.webContents.openDevTools();
    loginWindow.loadURL('http://localhost:3000');
  } else {
    //loginWindow.webContents.openDevTools();
    loginWindow.loadFile(`./build/index.html`);
  }

  loginWindow.on('closed', () => loginWindow = null);


}

app.on('ready', createLoginWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
