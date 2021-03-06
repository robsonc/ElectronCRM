'use strict';

//jshint node:true
//jshint esversion: 6

const electron = require('electron')
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const googleApi = require('./app/libs/google-api');
const facebookAuth = require('./app/libs/facebook-auth');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, show: false })

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    //mainWindow.setMenu(null);

    mainWindow.webContents.on('dom-ready', function () {
        mainWindow.maximize();
        mainWindow.show();
    });

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

ipcMain.on('google-grant-permission', function (evt, arg) {
    googleApi.showPermissionDialog();
});

ipcMain.on('google-authorize', function (evt, args) {
    googleApi.authorize(args.code);
});

ipcMain.on('facebook-auth-dialog', function (evt, args) {
    facebookAuth.showPermissionDialog();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('uncaugthException', function (e) {
    console.log(e);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
