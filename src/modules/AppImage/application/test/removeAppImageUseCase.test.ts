import { afterEach, describe, expect, it, vi } from "vitest"
import { removeAppImageUseCase } from "../removeAppImageUseCase"
import { AppImageRepository } from "../../domain/AppImageRepository"
import { AppImage } from "../../domain/AppImage"

describe("removeAppImageUseCase", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    const mockAppImage = AppImage.create({ id: "1", path: "test/path" })

    const mockAppImageRepository: AppImageRepository = {
        save: vi.fn(),
        remove: vi.fn().mockImplementation((id: string) => {
            if (id === "1") return mockAppImage
            return null
        }),
        getById: vi.fn()
    }

    it("should call the repository remove method with the correspondent id", async () => {
        await removeAppImageUseCase("1", mockAppImageRepository)

        expect(mockAppImageRepository.remove).toHaveBeenCalledWith("1")
    })

    it("should return void independently of the existence or not of the id", async () => {
        // Id 1 exists
        const appImage = await removeAppImageUseCase("1", mockAppImageRepository)

        // Id 2 does not exist
        const appImage2 = await removeAppImageUseCase("2", mockAppImageRepository)

        expect(appImage).toBeUndefined()
        expect(appImage2).toBeUndefined()
    })
})
