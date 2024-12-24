import { FormEvent, useState } from "react";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Icon } from "../modules/TrayApp/components/Icon";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";
import { TrayAppAction, TrayAppActions } from "../modules/TrayAppAction/TrayAppAction";

interface CreateTrayAppFormProps {
    trayApp: TrayApp
    onUpdated: () => void
}

export const UpdateTrayAppForm = ({ trayApp, onUpdated }: CreateTrayAppFormProps) => {
    const updateTrayApp = useTrayAppsStore(s => s.updateTrayApp)

    const [iconSrc, setIconSrc] = useState<string>(trayApp.iconSrc)

    const handleSelectImage = async () => {
        const filePath = await open({ multiple: false, filters: [{ name: "*", extensions: ["png"] }] })

        if (!filePath) return

        setIconSrc(filePath)
    }

    const handleCreateTrayApp = async (e: FormEvent, iconSrc: string | null) => {
        e.preventDefault();

        const fields = new FormData(e.target as HTMLFormElement);

        const name = fields.get("trayAppName");
        if (!name) return
        if (typeof name !== "string") return

        const actionValue = fields.get("actionValue");
        if (typeof actionValue !== "string") return

        const action: TrayAppAction = {
            type: TrayAppActions.OPEN_PATH,
            configuration: {
                path: actionValue
            }
        }

        if (!iconSrc) return

        updateTrayApp({ ...trayApp, name, iconSrc, action })

        onUpdated()
    }

    return <form onSubmit={(e) => handleCreateTrayApp(e, iconSrc)} autoComplete="off">
        <input name="trayAppName" defaultValue={trayApp.name} />
        <button onClick={handleSelectImage}>Select App Icon</button>

        <label htmlFor="actionType">Action Type</label>
        <input name="actionValue" defaultValue={trayApp.action?.configuration.path} />

        {iconSrc && <Icon src={convertFileSrc(iconSrc)} altName="Selected icon" />}

        <button type="submit">Update Tray App</button>

    </form>
}