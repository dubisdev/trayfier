import { Link, useParams, Redirect } from "wouter";
import { LayoutBase } from "../layouts/LayoutBase"
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { Routes } from "./Routes";

export const EditTrayApp = () => {
    const { id: trayAppId } = useParams<{ id: string }>()

    const trayApp = useTrayAppsStore(s => s.getById(trayAppId))

    if (!trayApp) return <Redirect to={Routes.HOME} />

    return <LayoutBase>

        <h1>Editing {trayApp.name}</h1>
        <Link href={Routes.HOME}>Home</Link>

    </LayoutBase>
}
