import { create } from "zustand";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";
import { showTrayApp } from "../modules/TrayApp/application/showTrayApp";
import { TauriTrayAppVisibilityManager } from "../modules/TrayApp/infrastructure/TauriTrayAppDisplayer";
import { hideTrayApp } from "../modules/TrayApp/application/hideTrayApp";

type TrayAppStore = {
    trayApps: TrayApp[];
    addTrayApp: (trayAppPrimitives: { name: string, icon: string }) => void;
    deleteTrayApp: (trayAppId: TrayApp) => void;
}

const trayAppVisibilityManager = new TauriTrayAppVisibilityManager()

export const useTrayAppsStore = create<TrayAppStore>()((set) => ({
    trayApps: [],

    addTrayApp: (trayInfo) => {
        const trayApp = TrayApp.create({
            ...trayInfo,
            id: crypto.randomUUID(),
        })

        set((state) => ({ trayApps: [...state.trayApps, trayApp] }))

        showTrayApp(trayApp, trayAppVisibilityManager)
    },

    deleteTrayApp: (trayApp: TrayApp) => {
        set((state) => ({ trayApps: state.trayApps.filter(app => app !== trayApp) }))

        hideTrayApp(trayApp, trayAppVisibilityManager)
    }
}));
