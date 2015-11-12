"use strict"

const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const notifier = require('node-notifier');

var mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 170,
    resizable: false,
    fullscreen: false,
    'use-content-size': true
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });

  ipc.on('timeup', function() {
    notifier.notify({
      title: "Time's up!",
      message: "Your time box has closed"
    });
  });
});
