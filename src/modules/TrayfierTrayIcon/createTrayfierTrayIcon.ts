
import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu, MenuItem } from "@tauri-apps/api/menu";
import { toggleTrayfierWindow } from "./toggleTrayfierWindow";
import { exit } from "@tauri-apps/plugin-process"
import { resolveResource } from '@tauri-apps/api/path'

const iconId = "trayfier-icon"

const hide = async () => {
    const tray = await TrayIcon.getById(iconId)

    if (!tray) return

    await tray.setVisible(false)
    await tray.close()
}

export const createTrayfierTrayIcon = async () => {
    const tray = await TrayIcon.getById(iconId)

    if (tray) await hide()

    await TrayIcon.new({
        icon: await resolveResource("icons/icon.png"),
        tooltip: "Trayfier",
        action: async (event) => {
            if (event.type === "Click" && event.buttonState === "Up") {
                await toggleTrayfierWindow()
            }
        },
        id: iconId,
        menu: await Menu.new({
            items: [
                await MenuItem.new({
                    text: "Show/Hide Trayfier",
                    action: async () => {
                        await toggleTrayfierWindow()
                    }
                }),
                await MenuItem.new({
                    text: "Quit",
                    action: async () => {
                        await exit(0)
                    }
                })
            ]
        })
    })
}
