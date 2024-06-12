import { TrayApp } from "../domain/TrayApp";
import { TrayAppVisibilityManager } from "../domain/TrayAppVisibilityManager";

export const showTrayApp = async (trayApp: TrayApp, displayer: TrayAppVisibilityManager) => {
    await displayer.show(trayApp);
}
