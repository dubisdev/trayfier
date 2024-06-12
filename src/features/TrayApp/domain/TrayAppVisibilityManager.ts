import { TrayApp } from "./TrayApp";

export interface TrayAppVisibilityManager {
    show: (trayApp: TrayApp) => Promise<void>
    hide: (trayApp: TrayApp) => Promise<void>
}
