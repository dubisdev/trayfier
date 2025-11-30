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

// Disable context menu
window.addEventListener("contextmenu", (e) => { e.preventDefault() })

// Disable "non-native" shortcuts
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.code === "KeyR") e.preventDefault()
  if (e.ctrlKey && e.code === "KeyJ") e.preventDefault()
  if (e.ctrlKey && e.code === "KeyF") e.preventDefault()
  if (e.ctrlKey && e.code === "KeyU") e.preventDefault()
  if (e.ctrlKey && e.code === "KeyP") e.preventDefault()
  if (e.ctrlKey && e.code === "KeyG") e.preventDefault()
  if (e.code === "F3") e.preventDefault()
  if (e.code === "F5") e.preventDefault()
  if (e.code === "F7") e.preventDefault()
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
