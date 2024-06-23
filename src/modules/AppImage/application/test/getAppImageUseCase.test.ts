import { afterEach, describe, expect, it, vi } from "vitest"
import { getAppImageUseCase } from "../getAppImageUseCase"
import { AppImageRepository } from "../../domain/AppImageRepository"
import { AppImage } from "../../domain/AppImage"

describe("getAppImageUseCase", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    const mockAppImage = AppImage.create({ id: "1", path: "test/path", name: "test.png" })

    const mockAppImageRepository: AppImageRepository = {
        save: vi.fn(),
        remove: vi.fn(),
        getByName: vi.fn().mockImplementation((id: string) => {
            if (id === "1") return mockAppImage
            return null
        })
    }

    it("should call the repository getByName method with the correspondent id", async () => {
        await getAppImageUseCase("1", mockAppImageRepository)

        expect(mockAppImageRepository.getByName).toHaveBeenCalledWith("1")
    })

    it("should return the app image if exists", async () => {
        const appImage = await getAppImageUseCase("1", mockAppImageRepository)

        expect(appImage).toBe(mockAppImage)
    })

    it("should return null if the app image does not exist", async () => {
        const appImage = await getAppImageUseCase("2", mockAppImageRepository)

        expect(appImage).toBeNull()
    })

})
