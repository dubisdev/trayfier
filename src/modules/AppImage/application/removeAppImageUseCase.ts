import { AppImageRepository } from "../domain/AppImageRepository"

export const removeAppImageUseCase = async (appImageName: string, repository: AppImageRepository) => {
    repository.remove(appImageName);
}
