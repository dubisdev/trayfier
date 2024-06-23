import { TauriAppImageRepository } from "./modules/AppImage/infrastructure/TauriAppImageRepository";
import { TauriTrayAppVisibilityManager } from "./modules/TrayApp/infrastructure/TauriTrayAppDisplayer";

const tauriAppImageRepository = new TauriAppImageRepository()

const tauriTrayAppVisibilityManager = new TauriTrayAppVisibilityManager()

export { tauriAppImageRepository, tauriTrayAppVisibilityManager }
