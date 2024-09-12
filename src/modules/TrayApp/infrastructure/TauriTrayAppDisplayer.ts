import { TrayIcon } from "@tauri-apps/api/tray";
import { TrayApp } from "../domain/TrayApp";
import { TrayAppVisibilityManager } from "../domain/TrayAppVisibilityManager";
import { TrayAppMenuItem } from "../domain/TrayAppMenu";
import { Menu, MenuItem, Submenu } from "@tauri-apps/api/menu";
import { TauriTrayAppActionExecutor } from "../../TrayAppAction/infrastructure/TauriTrayAppActionExecutor";

export class TauriTrayAppVisibilityManager implements TrayAppVisibilityManager {
    async show(trayApp: TrayApp) {
        const tray = await TrayIcon.getById(trayApp.id)

        if (tray) await this.hide(trayApp)

        const menuItems = (trayApp.menu?.menu || []).map(menuItem => this.mapMenuToTauriMenu(menuItem))

        const menuItemsResolved = await Promise.all(menuItems)

        await TrayIcon.new({
            icon: trayApp.iconSrc,
            tooltip: trayApp.name,
            action: (event) => {
                if ("click" in event) {
                    if (event.click.button_state === "Up") {
                        trayApp.action && TauriTrayAppActionExecutor.execute(trayApp.action)
                    }
                }
            },
            id: trayApp.id,
            menu: trayApp.menu && await Menu.new({ items: menuItemsResolved })
        })
    }

    async hide(trayApp: TrayApp) {
        const tray = await TrayIcon.getById(trayApp.id)

        if (!tray) return

        await tray.setVisible(false)
        await tray.close()
    }

    private async mapMenuToTauriMenu(menuItem: TrayAppMenuItem) {
        if (!menuItem.menu || menuItem.menu.length === 0) {
            return await MenuItem.new({
                text: menuItem.label,
                action: () => TauriTrayAppActionExecutor.execute(menuItem.action)
            })
        }

        const itemsPromises = menuItem.menu.map(subItem => this.mapMenuToTauriMenu(subItem))

        const items = await Promise.all(itemsPromises)

        const submenu = await Submenu.new({ text: menuItem.label, items })

        return submenu
    }
}
