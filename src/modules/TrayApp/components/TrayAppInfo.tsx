import { convertFileSrc } from "@tauri-apps/api/core"
import { useTrayAppsStore } from "../../../stores/useTrayAppsStore"
import { TrayApp } from "../domain/TrayApp"
import { Icon } from "./Icon"
import { useLocation } from "wouter"
import { Routes } from "../../../routes/Routes"

export const TrayAppInfo = ({ app }: { app: TrayApp }) => {
    const { name, iconSrc } = app

    const [, navigate] = useLocation()

    const openEditForm = () => navigate(Routes.EDIT_TRAY_APP.replace(":id", app.id))

    const deleteTrayApp = useTrayAppsStore(s => s.deleteTrayApp)

    const handleDeleteTrayApp = () => {
        deleteTrayApp(app)
    }

    return <div className="flex p-3 justify-between border border-black rounded-md">
        <Icon src={convertFileSrc(iconSrc)} altName={name} />

        <span>{name}</span>

        <button onClick={openEditForm}>Edit</button>

        <button onClick={handleDeleteTrayApp}>Delete</button>
    </div>
}
