import { TrayIcon } from "@tauri-apps/api/tray";
import { TrayApp } from "../domain/TrayApp";
import { TrayAppVisibilityManager } from "../domain/TrayAppVisibilityManager";

export class TauriTrayAppVisibilityManager implements TrayAppVisibilityManager {
    async show(trayApp: TrayApp) {
        const tray = await TrayIcon.getById(trayApp.id)

        if (tray) await this.hide(trayApp)

        await TrayIcon.new({
            icon: trayApp.iconSrc,
            tooltip: trayApp.name,
            id: trayApp.id
        })
    }

    async hide(trayApp: TrayApp) {
        const tray = await TrayIcon.getById(trayApp.id)

        if (!tray) return

        await tray.setVisible(false)
        await tray.close()
    }
}
