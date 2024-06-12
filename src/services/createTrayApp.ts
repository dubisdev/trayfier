import { TrayApp } from "../modules/TrayApp/domain/TrayApp";

export interface TrayAppParams {
    name: string;
}

export const createTrayApp = (trayApp: TrayAppParams) => {
    return TrayApp.create({
        name: trayApp.name,
        id: crypto.randomUUID(),
        icon: "./icons/icon.png"
    })

}
