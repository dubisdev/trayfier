import { Link } from "wouter";
import { LayoutBase } from "../layouts/LayoutBase"
import { TrayAppInfo } from "../modules/TrayApp/components/TrayAppInfo";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { Routes } from "./Routes";

export const Home = () => {
    const trayApps = useTrayAppsStore(s => s.trayApps)

    return <LayoutBase pageTitle="Your Apps">
        <ul className="p-0 flex flex-col gap-2">
            {
                trayApps.map((trayApp) =>
                    <li key={trayApp.id}>
                        <TrayAppInfo app={trayApp} />
                    </li>
                )
            }
        </ul>

        <Link href={Routes.CREATE_TRAY_APP}>Create Tray App</Link>
    </LayoutBase>
}
