import { TrayAppVisibilityManager } from "../../di"
import { TrayAppActions } from "../TrayAppAction/TrayAppAction"

const iconId = "trayfier-icon"

export const createTrayfierTrayIcon = () => {
    TrayAppVisibilityManager.show({
        id: iconId,
        name: "Trayfier",
        iconSrc: "./icons/icon.png",
        action: {
            type: TrayAppActions.OPEN_PATH,
            configuration: {
                path: "test"
            }
        }
    })
}
