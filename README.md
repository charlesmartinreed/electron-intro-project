# Electron

- Open source lbirary for creating **cross-platform desktop** apps using HTML/CSS/JS
- Made by Github team, presumably with love
- Works by combining Chromium and Node.js into a single runtime
- Package apps for either Windows, Mac or Linux

# How Electron Works

- There are two processes, the **main process** and the **renderer process**
- Main Process runs package.json (usually main.js, but that's up to you) and creates a BrowserWindow instance to run web pages
- Renderer Process runs each web page in its own isolated process, which is destroyed when the page is closed

# Installing Electron

- install node.js
- npm install -g electron
- npm install electron -save
- electron .
