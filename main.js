const electron = require('electron');
const url = require('url');
const path = require('path');
const {
    ipcMain
} = electron;

const {
    app,
    BrowserWindow,
    Menu
} = electron;

let mainWindow;
let modalWindow;

process.env.NODE_ENV = 'development'

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        frame:false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        app.quit()
    })
    // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Menu.setApplicationMenu(mainMenu);
})

// const showModalWindow = () => {
//     modalWindow = new BrowserWindow({
//         title: 'Modal',
//         width: 400,
//         height: 250,
//         webPreferences: {
//             nodeIntegration: true
//         }
//     });
//     modalWindow.setMenu(null);
//     modalWindow.loadURL(url.format({
//         pathname: path.join(__dirname, 'modalWindow.html'),
//         protocol: 'file:',
//         slashes: true
//     }))

//     modalWindow.on('close', function () {
//         modalWindow = null;
//     })
// }





// ipcMain.on('item:add', function (e, item) {
//     mainWindow.webContents.send('item:add', item);
// })

ipcMain.on('toggle', function () {
    mainWindow.minimize();
})

ipcMain.on('resize', function () {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
})

ipcMain.on('close', function () {
    app.quit();
})


// const mainMenuTemplate = [{
//     label: 'File',
//     submenu: [{
//             label: 'Modal',
//             click() {
//                 showModalWindow();
//             }
//         },
//         {
//             label: 'Quit',
//             // accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//             click() {
//                 app.quit();
//             }
//         }
//     ]
// }]

if (process.platform === 'darwin') mainMenuTemplate.unshift({});

// if (process.env.NODE_ENV !== 'production') {
//     mainMenuTemplate.push({
//         label: 'DevTools',
//         submenu: [{
//                 role: 'reload'
//             },
//             {
//                 label: 'ToggleDevTools',
//                 accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//                 click(item, focusedWindow) {
//                     focusedWindow.toggleDevTools()
//                 }
//             }
//         ]
//     })
// }