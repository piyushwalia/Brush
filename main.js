const electron = require('electron');
const path = require('path');
const url = require('url');
 
var ipc = require('electron').ipcRenderer;
 
process.env.NODE_ENV = 'production';
const {app, BrowserWindow, Menu} = electron;
let mainWindow; 


app.on('ready', function(){

    mainWindow = new BrowserWindow({      
        title: 'Brush | Theme styling for Magento2', 
        backgroundColor: '#1a1a1d',       
        width:1050,
        height:700,
        minWidth:1000,
        minHeight:600,                
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, 'icons/png/64x64.png')        
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));     
    // Build menu from template
    require('./core/mainmenu.js')

});


 


app.on('window-all-closed', function () {
    // check if the system is macOS
    // If so, quit the application
    // otherwise, this is already done automatically
    if(process.platform !== 'Darwin') {
        app.quit()
    }
})





