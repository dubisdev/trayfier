import { convertFileSrc } from "@tauri-apps/api/core"
import { useTrayAppsStore } from "../../../stores/useTrayAppsStore"
import { TrayApp } from "../domain/TrayApp"
import { Icon } from "./Icon"
import { useLocation } from "wouter"
import { Routes } from "../../../routes/Routes"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


export const TrayAppInfo = ({ app }: { app: TrayApp }) => {
    const { name, iconSrc, action: { configuration: { path } } = {} } = app

    const [, navigate] = useLocation()

    const openEditForm = () => navigate(Routes.EDIT_TRAY_APP.replace(":id", app.id))

    const deleteTrayApp = useTrayAppsStore(s => s.deleteTrayApp)

    const handleDeleteTrayApp = () => {
        deleteTrayApp(app)
    }

    return <Card>
        <CardHeader>
            <Icon src={convertFileSrc(iconSrc)} altName={name} />
            <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
            <p>Open: <a href={path}>{path}</a></p>
        </CardContent>
        <CardFooter className="gap-4">
            <Button onClick={openEditForm} className="w-1/2">Edit</Button>
            <Button onClick={handleDeleteTrayApp} className="w-1/2">Delete</Button>
        </CardFooter>
    </Card>
}
