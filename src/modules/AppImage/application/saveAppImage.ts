import { AppImage } from "../domain/AppImage";
import { AppImageRepository } from "../domain/AppImageRepository";

export const saveAppImage = async (appImage: AppImage, repository: AppImageRepository) => {
    await repository.save(appImage);
}
