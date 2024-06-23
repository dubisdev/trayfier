import { create } from "zustand";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";
import { showTrayApp } from "../modules/TrayApp/application/showTrayApp";
import { hideTrayApp } from "../modules/TrayApp/application/hideTrayApp";
import { tauriTrayAppVisibilityManager, tauriAppImageRepository } from "../di";
import { AppImage } from "../modules/AppImage/domain/AppImage";
import { removeAppImageUseCase } from "../modules/AppImage/application/removeAppImageUseCase";
import { saveAppImageUseCase } from "../modules/AppImage/application/saveAppImageUseCase";

type TrayAppStore = {
    trayApps: TrayApp[];
    addTrayApp: (trayAppPrimitives: { name: string }, trayImage: AppImage) => void;
    deleteTrayApp: (trayAppId: TrayApp) => void;
}

export const useTrayAppsStore = create<TrayAppStore>()((set) => ({
    trayApps: [],

    addTrayApp: (trayInfo, trayImage) => {
        const trayApp = TrayApp.create({
            ...trayInfo,
            id: crypto.randomUUID(),
            icon: trayImage
        })

        set((state) => ({ trayApps: [...state.trayApps, trayApp] }))

        saveAppImageUseCase(trayApp.appImage, tauriAppImageRepository)

        showTrayApp(trayApp, tauriTrayAppVisibilityManager)
    },

    deleteTrayApp: async (trayApp: TrayApp) => {
        set((state) => ({ trayApps: state.trayApps.filter(app => app !== trayApp) }))

        await hideTrayApp(trayApp, tauriTrayAppVisibilityManager)

        await removeAppImageUseCase(trayApp.appImage.name, tauriAppImageRepository)
    }
}));
