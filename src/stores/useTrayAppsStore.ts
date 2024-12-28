import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";
import { showTrayApp } from "../modules/TrayApp/application/showTrayApp";
import { hideTrayApp } from "../modules/TrayApp/application/hideTrayApp";
import { TrayAppVisibilityManager } from "../di";
import { TrayAppActions } from "@/modules/TrayAppAction/TrayAppAction";

type TrayAppStore = {
    trayApps: TrayApp[];
    addTrayApp: (trayAppPrimitives: { name: string, iconSrc: string, path: string }) => void;
    deleteTrayApp: (trayAppId: TrayApp) => void;
    updateTrayApp: (trayApp: TrayApp) => void;
    getById: (trayAppId: string) => TrayApp | undefined;
}

export const useTrayAppsStore = create<TrayAppStore>()(
    persist<TrayAppStore>(
        (set, get) => ({
            trayApps: [],

            getById: (trayAppId) => {
                return get().trayApps.find(app => app.id === trayAppId)
            },

            addTrayApp: (trayInfo) => {
                const { iconSrc, name, path } = trayInfo
                const trayApp: TrayApp = {
                    iconSrc,
                    name,
                    action: {
                        type: TrayAppActions.OPEN_PATH,
                        configuration: { path }
                    },
                    id: crypto.randomUUID()
                }

                set((state) => ({ trayApps: [...state.trayApps, trayApp] }))

                showTrayApp(trayApp, TrayAppVisibilityManager)
            },

            deleteTrayApp: async (trayApp: TrayApp) => {
                set((state) => ({ trayApps: state.trayApps.filter(app => app !== trayApp) }))

                await hideTrayApp(trayApp, TrayAppVisibilityManager)
            },

            updateTrayApp: async (trayApp: TrayApp) => {
                set((state) => ({
                    trayApps: state.trayApps.map(app => {
                        if (app.id === trayApp.id) return trayApp

                        return app
                    })
                }))

                await hideTrayApp(trayApp, TrayAppVisibilityManager)
                await showTrayApp(trayApp, TrayAppVisibilityManager)
            }
        }
        ), {
        name: "tray-apps",
        onRehydrateStorage: () => (state) => {
            if (!state) return

            state.trayApps.forEach((app) => {
                showTrayApp(app, TrayAppVisibilityManager)
            })
        }
    }
    )
);
