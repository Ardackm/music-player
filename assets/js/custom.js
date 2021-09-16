const { app, BrowserWindow, ipc,Main, Menu, dialog }= require("electron");
cost path = require("path");

let win;

function createWindow() {
    win = new BrowserWindow({
        with: 600,
        height: 700,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: false
        }
    })

    win.loadFile("index.html")

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu)
}

ipcMain.on("close", () => {
    win.close();
})

const mainMenuTemplate = [
    {
        label: 'Open File',
        accelerator: "CTRL+O",
        click: async () => {
            const { filePaths } = await dialog.showOpenDialog({
                properties: ["openFile"]
            })
            const file = filePaths[0];
            const filename = path.basename(file);
            win.webContents.send('openFile', { file, filename });   
        }
    }
]

app.whenReady().then(()=> {
    createWindow();
})