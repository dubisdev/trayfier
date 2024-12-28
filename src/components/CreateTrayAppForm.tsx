import { FormEvent, useState } from "react";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Icon } from "../modules/TrayApp/components/Icon";

interface CreateTrayAppFormProps {
    onCreated: () => void
}

export const CreateTrayAppForm = (props: CreateTrayAppFormProps) => {
    const addTrayApp = useTrayAppsStore(s => s.addTrayApp)

    const [iconSrc, setIconSrc] = useState<string | null>(null)

    const handleSelectImage = async () => {
        const filePath = await open({ multiple: false, filters: [{ name: "*", extensions: ["png"] }] })

        setIconSrc(filePath)
    }

    const handleCreateTrayApp = async (e: FormEvent, iconSrc: string | null) => {
        e.preventDefault();

        const fields = new FormData(e.target as HTMLFormElement);

        const name = fields.get("trayAppName");

        if (!name) return

        if (typeof name !== "string") return

        if (!iconSrc) return

        addTrayApp({ name, iconSrc, path: iconSrc })

        props.onCreated()
    }

    return <form onSubmit={(e) => handleCreateTrayApp(e, iconSrc)} autoComplete="off">
        <input name="trayAppName" />
        <button onClick={handleSelectImage}>Select App Icon</button>
        {iconSrc && <Icon src={convertFileSrc(iconSrc)} altName="Selected icon" />}

        <button type="submit">Add Tray App</button>

    </form>
}
