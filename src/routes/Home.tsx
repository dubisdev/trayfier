import { Link } from "wouter";
import { LayoutBase } from "../layouts/LayoutBase"
import { TrayAppInfo } from "../modules/TrayApp/components/TrayAppInfo";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { Routes } from "./Routes";
import { Button } from "@/components/ui/button";
import { Confirm } from "@/components/ConfirmModal";

export const Home = () => {
    const trayApps = useTrayAppsStore(s => s.trayApps)

    return <LayoutBase
        pageTitle="Your Apps"
        actionButton={
            <Button asChild>
                <Link href={Routes.CREATE_TRAY_APP}>
                    Create Tray App
                </Link>
            </Button>
        }>
        <ul className="p-0 grid gird-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {
                trayApps.map((trayApp) =>
                    <li key={trayApp.id}>
                        <TrayAppInfo app={trayApp} />
                    </li>
                )
            }
        </ul>
        <Confirm.Root />
    </LayoutBase>
}
