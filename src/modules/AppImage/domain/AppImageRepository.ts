import { AppImage } from "./AppImage"

export interface AppImageRepository {
    save(appImage: AppImage): Promise<void>
    getById(id: string): Promise<AppImage | null>
    remove(id: string): Promise<void>
}
