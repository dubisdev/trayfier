import { TrayApp } from "../domain/TrayApp";
import { TrayAppVisibilityManager } from "../domain/TrayAppVisibilityManager";

export const hideTrayApp = async (trayApp: TrayApp, displayer: TrayAppVisibilityManager) => {
    await displayer.hide(trayApp);
}
