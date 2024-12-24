import { FormEvent, useState } from "react";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Icon } from "../modules/TrayApp/components/Icon";
import { TrayApp } from "../modules/TrayApp/domain/TrayApp";

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

        if (!iconSrc) return

        updateTrayApp({ ...trayApp, name, iconSrc })

        onUpdated()
    }

    return <form onSubmit={(e) => handleCreateTrayApp(e, iconSrc)}>
        <input name="trayAppName" defaultValue={trayApp.name} />
        <button onClick={handleSelectImage}>Select App Icon</button>
        {iconSrc && <Icon src={convertFileSrc(iconSrc)} altName="Selected icon" />}

        <button type="submit">Update Tray App</button>

    </form>
}
