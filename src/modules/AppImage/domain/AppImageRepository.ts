import { AppImage } from "./AppImage"

export interface AppImageRepository {
    save(appImage: AppImage): Promise<void>
    getByName(name: string): Promise<AppImage | null>
    remove(name: string): Promise<void>
}
