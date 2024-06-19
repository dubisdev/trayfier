import { AppImageRepository } from "../domain/AppImageRepository"

export const removeAppImageUseCase = async (appImageId: string, repository: AppImageRepository) => {
    repository.remove(appImageId);
}
