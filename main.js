const electron = require('electron');
const path = require('path');
const url = require('url');
 
var ipc = require('electron').ipcRenderer;
 
process.env.NODE_ENV = 'development';
const {app, BrowserWindow, Menu} = electron;
let mainWindow; 


app.on('ready', function(){

    mainWindow = new BrowserWindow({      
        title: 'Brush | Theme styling for Magento2', 
        backgroundColor: '#1a1a1d',       
        width:1050,
        height:700,
        minWidth:900,
        minHeight:600,        
        frame: false,        
        titleBarStyle: 'hidden',
        icon: path.join(__dirname, '/icons/png/64x64.png')        
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));     
    
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  mainWindow.webContents.openDevTools();

});


 


app.on('window-all-closed', function () {
    // check if the system is macOS
    // If so, quit the application
    // otherwise, this is already done automatically
    if(process.platform !== 'Darwin') {
        app.quit()
    }
})



const mainMenuTemplate = [    
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


