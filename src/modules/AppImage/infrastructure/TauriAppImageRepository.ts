import { AppImage } from "../domain/AppImage";
import { AppImageRepository } from "../domain/AppImageRepository";
import { appConfigDir } from "@tauri-apps/api/path"
import { open } from "@tauri-apps/plugin-dialog"
import { } from "@tauri-apps/api/"

const APP_FILES_DIR = await appConfigDir();

export class TauriAppImageRepository implements AppImageRepository {
    private appDataPath = APP_FILES_DIR

    // TODO implement
    async save(appImage: AppImage): Promise<void> {
        const selected = await open({ filters: [{ name: "*", extensions: ["png"] }] })

        if (!selected) return

        console.log('Saving image', selected.path, 'to', this.appDataPath);
    }

    // TODO implement
    async getById(id: string): Promise<AppImage | null> {
        console.log('Finding image', id, 'in', this.appDataPath);
        return null;
    }

    // TODO implement
    async remove(id: string): Promise<void> {
        // in this case the id is the path of the image
        console.log('Removing image', id, 'from', this.appDataPath);
    }
}
