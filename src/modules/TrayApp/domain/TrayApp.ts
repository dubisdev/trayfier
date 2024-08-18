export class TrayApp {
    private constructor(
        readonly id: string,
        readonly iconSrc: string,
        readonly name: string,
    ) { }

    static create({ id, iconSrc, name }: { id: string, iconSrc: string, name: string }) {
        return new TrayApp(id, iconSrc, name);
    }
}
