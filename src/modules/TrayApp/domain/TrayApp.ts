import { AppImage } from "../../AppImage/domain/AppImage";

export class TrayApp {
    private constructor(
        readonly id: string,
        readonly appImage: AppImage,
        readonly name: string,
    ) { }

    static create({ id, icon, name }: { id: string, icon: AppImage, name: string }) {
        return new TrayApp(id, icon, name);
    }
}
