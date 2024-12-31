import { getCurrentWindow } from "@tauri-apps/api/window"

export const toggleTrayfierWindow = async () => {
    const currentWindow = getCurrentWindow()
    const hidden = !await currentWindow.isVisible()

    if (hidden) {
        await currentWindow.show()
        await currentWindow.setFocus()
        return
    }

    await currentWindow.hide()
}
