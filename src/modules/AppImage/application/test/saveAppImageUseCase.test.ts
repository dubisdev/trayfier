import { afterEach, describe, expect, it, vi } from "vitest"
import { saveAppImageUseCase } from "../saveAppImageUseCase"
import { AppImageRepository } from "../../domain/AppImageRepository"
import { AppImage } from "../../domain/AppImage"

describe("saveAppImageUseCase", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    const mockAppImage = AppImage.create({ id: "1", path: "test/path", name: "test.png" })

    const mockAppImageRepository: AppImageRepository = {
        save: vi.fn().mockImplementation((id: string) => {
            if (id === "1") return mockAppImage
            return null
        }),
        remove: vi.fn(),
        getByName: vi.fn()
    }

    it("should call the repository save method with the correspondent id", async () => {
        await saveAppImageUseCase(mockAppImage, mockAppImageRepository)

        expect(mockAppImageRepository.save).toHaveBeenCalledWith(mockAppImage)
    })

    it("always should return void", async () => {
        const appImage = await saveAppImageUseCase(mockAppImage, mockAppImageRepository)

        expect(appImage).toBeUndefined()
    })

})
