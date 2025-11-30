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
import { Confirm } from "@/components/ConfirmModal"
import { open } from "@tauri-apps/plugin-shell"
import { TrayAppActions } from "@/modules/TrayAppAction/TrayAppAction"

export const TrayAppInfo = ({ app }: { app: TrayApp }) => {
    const { name, iconSrc, action } = app

    const [, navigate] = useLocation()

    const openEditForm = () => navigate(Routes.EDIT_TRAY_APP.replace(":id", app.id))

    const deleteTrayApp = useTrayAppsStore(s => s.deleteTrayApp)

    const handleDeleteTrayApp = async () => {
        const res = await Confirm.call({ message: `Are you sure you want to delete ${name}?` })
        if (res) deleteTrayApp(app)
    }

    return <Card>
        <CardHeader className="items-center w-full">
            <Icon src={convertFileSrc(iconSrc)} altName={name} />
            <CardTitle className="text-xl">{name}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
            {
                action.type === TrayAppActions.OPEN_PATH && <p>
                    Open: <a
                        className="text-blue-600 text-ellipsis whitespace-nowrap"
                        onClick={() => open(action.configuration.path)}
                        href="#">
                        {action.configuration.path}
                    </a>
                </p>
            }
            {action.type === TrayAppActions.CODE && <p>Code Action</p>}

        </CardContent>
        <CardFooter className="gap-4">
            <Button onClick={openEditForm} className="w-1/2">Edit</Button>
            <Button variant="ghost" onClick={handleDeleteTrayApp} className="w-1/2">Delete</Button>
        </CardFooter>
    </Card>
}
