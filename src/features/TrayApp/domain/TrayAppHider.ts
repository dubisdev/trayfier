import { TrayApp } from "./TrayApp";

export interface TrayAppHider {
    run: (trayApp: TrayApp) => Promise<void>
}
