import { TrayAppAction } from "../../TrayAppAction/TrayAppAction";
import { TrayAppMenu } from "./TrayAppMenu";

export type TrayApp = {
    id: string,
    iconSrc: string,
    name: string,
    action: TrayAppAction,
    menu?: TrayAppMenu
}
