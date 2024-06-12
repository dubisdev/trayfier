import { create } from "zustand";
import { TrayApp } from "../features/TrayApp/domain/TrayApp";
import { showTrayApp } from "../features/TrayApp/application/showTrayApp";
import { TauriTrayAppVisibilityManager } from "../features/TrayApp/infrastructure/TauriTrayAppDisplayer";
import { hideTrayApp } from "../features/TrayApp/application/hideTrayApp";
import { TrayAppParams, createTrayApp } from "../services/createTrayApp";

type TrayAppStore = {
    trayApps: TrayApp[];
    addTrayApp: (trayApp: TrayAppParams) => void;
    deleteTrayApp: (trayAppId: TrayApp) => void;
}

const trayAppVisibilityManager = new TauriTrayAppVisibilityManager()

export const useTrayAppsStore = create<TrayAppStore>()((set) => ({
    trayApps: [],

    addTrayApp: (trayInfo: TrayAppParams) => {
        const trayApp = createTrayApp(trayInfo)

        set((state) => ({ trayApps: [...state.trayApps, trayApp] }))

        showTrayApp(trayApp, trayAppVisibilityManager)
    },

    deleteTrayApp: (trayApp: TrayApp) => {
        set((state) => ({ trayApps: state.trayApps.filter(app => app !== trayApp) }))

        hideTrayApp(trayApp, trayAppVisibilityManager)
    }
}));
