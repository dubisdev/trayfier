import { Link, useParams, Redirect, useLocation } from "wouter";
import { LayoutBase } from "../layouts/LayoutBase"
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { Routes } from "./Routes";
import { UpdateTrayAppForm } from "../components/EditTrayAppActions";
import { Button } from "@/components/ui/button";

export const EditTrayApp = () => {
    const [, navigate] = useLocation()
    const { id: trayAppId } = useParams<{ id: string }>()

    const redirectToHome = () => navigate(Routes.HOME)

    const trayApp = useTrayAppsStore(s => s.getById(trayAppId))

    if (!trayApp) return <Redirect to={Routes.HOME} />

    return <LayoutBase
        actionButton={
            <Button asChild>
                <Link href={Routes.HOME}>
                    Cancel
                </Link>
            </Button>
        }

        pageTitle={`Edit ${trayApp.name}`}>
        <UpdateTrayAppForm trayApp={trayApp} onUpdated={redirectToHome} />
    </LayoutBase>
}
