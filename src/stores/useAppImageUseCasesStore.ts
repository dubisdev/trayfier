import { create } from "zustand";
import { AppImage } from "../modules/AppImage/domain/AppImage";
import { TauriAppImageRepository } from "../modules/AppImage/infrastructure/TauriAppImageRepository";
import { saveAppImageUseCase } from "../modules/AppImage/application/saveAppImageUseCase";
import { removeAppImageUseCase } from "../modules/AppImage/application/removeAppImageUseCase";
import { getAppImageUseCase } from "../modules/AppImage/application/getAppImageUseCase";

type AppImageStore = {
    saveAppImage: (appImage: AppImage) => void;
    removeAppImage: (appImage: AppImage) => void;
    getAppImage: (id: string) => Promise<AppImage | null>;
}

const appImageRepository = new TauriAppImageRepository()

export const useAppImageUseCasesStore = create<AppImageStore>()(() => ({
    saveAppImage: async (appImage: AppImage) => {
        return await saveAppImageUseCase(appImage, appImageRepository)
    },

    removeAppImage: async (appImage: AppImage) => {
        return await removeAppImageUseCase(appImage.id, appImageRepository)
    },

    getAppImage: async (id: string) => {
        return await getAppImageUseCase(id, appImageRepository)
    }
}));
