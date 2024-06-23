export class AppImage {
    private constructor(
        /**
         * Unique identifier for the image
         */
        readonly id: string,
        /**
         * Full path to the image file
         */
        readonly path: string,
        /**
         * Name of the image file. I. e. 'image.png'
         */
        readonly name: string,
    ) { }

    static create({ id, path, name }: { id: string, path: string, name: string }) {
        return new AppImage(id, path, name);
    }

}
