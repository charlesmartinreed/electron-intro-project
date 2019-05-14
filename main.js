const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

// capture global ref to window object to keep electron app window open when JavaScript does its garbage collection

let win; //would be an array if your app supports multi-windows

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: _dirname + "/img/sysinfo.png"
  });

  // load window with the index.html
  win.loadFile("index.html");

  // open our devtools, in dev
  win.webContents.openDevTools();

  // check when the window is closed, set win to null
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// Quit app when all windows are closed
app.on("window-all-closed", () => {
  // check for macOS since the expected behavior is that an app will remain open even when windows are closed unless the user explictly quits the app
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // for macOS, re-create a window in the app when dock icon clicked and no other windows are open
  if (win === null) {
    createWindow();
  }
});
