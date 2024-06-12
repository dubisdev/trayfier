import { TrayApp } from "./TrayApp";

export interface TrayAppRepository {
    subscribers: ((trayApps: TrayApp[]) => void)[];
    subscribeToTrayApps(callback: (trayApps: TrayApp[]) => void): void;

    addTrayApp(trayApp: TrayApp): void;
    getTrayApps(): TrayApp[];

    deleteTrayApp(trayAppId: string): void;
}
