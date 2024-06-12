export class TrayApp {
    private constructor(
        readonly id: string,
        readonly icon: string = "./icons/icon.png",
        readonly name: string,
    ) { }

    static create({ id, icon, name }: { id: string, icon?: string, name: string }) {
        return new TrayApp(id, icon, name);
    }
}
