const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

// MAIN WINDOW
let mainWindow;
let addWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  // pass in file://dirname/mainWindow.html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file",
      slashes: true
    })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

// Listen for app to be ready
app.on("ready", () => {
  createWindow();

  // Build out menu, using template defined below
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle create Add Window
const createAddWindow = () => {
  addWindow = new BrowserWindow({
    parent: mainWindow,
    width: 300,
    height: 200,
    title: "Add Shopping List Item",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // pass in file://dirname/mainWindow.html
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addWindow.html"),
      protocol: "file",
      slashes: true
    })
  );

  addWindow.on("closed", () => {
    addWindow = null;
  });

  addWindow.show();
  mainWindow.show();
};

// MENU TEMPLATE
// menu in Electron is just an array of objects
// by adding the empty to the menu, we can properly account for macOS menu quirks
const mainMenuTemplate = [
  ...(process.platform === "darwin"
    ? [
        {
          label: app.getName(),
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }
          ]
        }
      ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Items"
      },
      process.platform === "darwin" ? { role: "close" } : { role: "quit" }
    ]
  }
];
