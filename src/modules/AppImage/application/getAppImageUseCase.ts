import { AppImageRepository } from "../domain/AppImageRepository"

export const getAppImageUseCase = async (appImageId: string, repository: AppImageRepository) => {
    return await repository.getById(appImageId);
}
