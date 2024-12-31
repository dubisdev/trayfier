import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createTrayfierTrayIcon } from "./modules/TrayfierTrayIcon/createTrayfierTrayIcon";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { checkForUpdates } from "./modules/Updater/checkForUpdates";

// Avoid closing the app when the user clicks the close button (hide)
getCurrentWindow().onCloseRequested((e) => {
  // Prevent the window from closing
  e.preventDefault()

  getCurrentWindow().hide()
})

createTrayfierTrayIcon()
checkForUpdates()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
