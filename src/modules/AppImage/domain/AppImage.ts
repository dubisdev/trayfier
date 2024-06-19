export class AppImage {
    private constructor(
        readonly id: string,
        readonly path: string,
    ) { }

    static create({ id, path }: { id: string, path: string }) {
        return new AppImage(id, path);
    }

}
