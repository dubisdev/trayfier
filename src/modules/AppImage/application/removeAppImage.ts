import { AppImageRepository } from "../domain/AppImageRepository"

export const removeAppImage = async (appImageId: string, repository: AppImageRepository) => {
    repository.remove(appImageId);
}
