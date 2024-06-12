import { TrayIcon } from "@tauri-apps/api/tray";
import { TrayApp } from "../domain/TrayApp";
import { TrayAppVisibilityManager } from "../domain/TrayAppVisibilityManager";

export class TauriTrayAppVisibilityManager implements TrayAppVisibilityManager {
    async show(trayApp: TrayApp) {
        await TrayIcon.new({
            icon: trayApp.icon,
            tooltip: trayApp.name,
            id: trayApp.id,
        })
    }

    async hide(trayApp: TrayApp) {
        const tray = await TrayIcon.getById(trayApp.id)

        console.log(tray)

        if (!tray) return

        await tray.close().then(console.log).catch(console.error)
    }
}
