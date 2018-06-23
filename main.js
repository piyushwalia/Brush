require('electron-reload')(__dirname)


const electron = require('electron');
const path = require('path');
const url = require('url');
const storage = require('electron-storage');

var ipc = require('electron').ipcRenderer;
 
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu} = electron;
// variables
let mainWindow;


app.on('ready', function(){

    mainWindow = new BrowserWindow({            
        width:1050,
        height:700
    });
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
                label: 'Upload Mockup File ',                       
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
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:",
                // click(){
                //     document.querySelectorAll("input").value = "";
                // } 
            },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    
];


