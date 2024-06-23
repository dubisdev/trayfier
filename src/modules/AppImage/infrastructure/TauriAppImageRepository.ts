import { AppImage } from "../domain/AppImage";
import { AppImageRepository } from "../domain/AppImageRepository";
import { appConfigDir, BaseDirectory, join } from "@tauri-apps/api/path"
import { copyFile, mkdir, readFile, remove } from "@tauri-apps/plugin-fs"

const APP_FILES_DIR = await appConfigDir();

export class TauriAppImageRepository implements AppImageRepository {
    private appDataPath = APP_FILES_DIR

    // TODO implement
    async save(appImage: AppImage): Promise<void> {
        console.log('Saving image', appImage.path, 'to', this.appDataPath);

        await mkdir(this.appDataPath, { recursive: true })

        await copyFile(appImage.path, appImage.name, { toPathBaseDir: BaseDirectory.AppConfig })

        console.log('Image saved');
    }

    async getByName(name: string): Promise<AppImage | null> {
        console.log('Finding image', name, 'in', this.appDataPath);

        const image = await readFile(name, { baseDir: BaseDirectory.AppConfig })

        if (image) {
            const appImage = AppImage.create({
                id: crypto.randomUUID(),
                name,
                path: await join(this.appDataPath, name)
            })

            return appImage
        }

        return null;
    }

    // TODO implement
    async remove(name: string): Promise<void> {
        // in this case the id is the path of the image
        console.log('Removing image', name, 'from', this.appDataPath);

        await remove(name, { baseDir: BaseDirectory.AppConfig })
    }
}
