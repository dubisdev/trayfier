import { TrayAppAction } from "../../TrayAppAction/TrayAppAction"

export type TrayAppMenuItem = {
    id: string,
    label: string,
    action: TrayAppAction
    menu?: TrayAppMenuItem[]
}

export type TrayAppMenu = {
    menu: TrayAppMenuItem[]
}
