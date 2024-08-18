import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";
import { showTrayApp } from "../modules/TrayApp/application/showTrayApp";
import { hideTrayApp } from "../modules/TrayApp/application/hideTrayApp";
import { tauriTrayAppVisibilityManager } from "../di";

type TrayAppStore = {
    trayApps: TrayApp[];
    addTrayApp: (trayAppPrimitives: { name: string, iconSrc: string }) => void;
    deleteTrayApp: (trayAppId: TrayApp) => void;
}

export const useTrayAppsStore = create<TrayAppStore>()(
    persist(
        (set) => ({
            trayApps: [],

            addTrayApp: (trayInfo) => {
                const trayApp = TrayApp.create({ ...trayInfo, id: crypto.randomUUID() })

                set((state) => ({ trayApps: [...state.trayApps, trayApp] }))

                showTrayApp(trayApp, tauriTrayAppVisibilityManager)
            },

            deleteTrayApp: async (trayApp: TrayApp) => {
                set((state) => ({ trayApps: state.trayApps.filter(app => app !== trayApp) }))

                await hideTrayApp(trayApp, tauriTrayAppVisibilityManager)
            }
        }
        ), {
        name: "tray-apps",
        onRehydrateStorage: () => (state) => {
            if (!state) return

            console.log("rehydrated", state)
            state.trayApps.forEach((app) => {
                console.log("rehydrating...", app)
                showTrayApp(app, tauriTrayAppVisibilityManager)
            })
        }
    }
    )
);
