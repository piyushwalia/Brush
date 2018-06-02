const electron = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-storage');

process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu} = electron;
// variables
let mainWindow;


app.on('ready', function(){

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
  
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

});




const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Add Item'
            },
            {
                label:'Clear items'
            },
            {
                label:'Quit',                
                click(){
                    app.quit();
                }
            }
        ]
    }
];