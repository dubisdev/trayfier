import { Link } from "wouter";
import { LayoutBase } from "../layouts/LayoutBase"
import { TrayAppInfo } from "../modules/TrayApp/components/TrayAppInfo";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { Routes } from "./Routes";

export const Home = () => {
    const { trayApps } = useTrayAppsStore()

    return <LayoutBase>

        <h1>TrayFier</h1>
        <Link href={Routes.CREATE_TRAY_APP}>Create Tray App</Link>

        <ul style={{ padding: 0 }}>
            {
                trayApps.map((trayApp) =>
                    <li key={trayApp.id} style={{ listStyle: "none", margin: "10px 0" }}>
                        <TrayAppInfo app={trayApp} />
                    </li>
                )
            }
        </ul>

    </LayoutBase>
}
