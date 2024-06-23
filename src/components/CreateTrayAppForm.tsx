import { FormEvent, useState } from "react";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { open } from "@tauri-apps/plugin-dialog";
import { AppImage } from "../modules/AppImage/domain/AppImage";
import { convertFileSrc } from "@tauri-apps/api/core";
import { EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiIcon, EuiPanel } from "@elastic/eui";

export const CreateTrayAppForm = () => {
    const { addTrayApp } = useTrayAppsStore()

    const [appImage, setAppImage] = useState<AppImage | null>(null)

    const handleSelectImage = async () => {
        const file = await open({ multiple: false, filters: [{ name: "*", extensions: ["png"] }] })

        if (!file || !file.name) return

        const appImage = AppImage.create({
            id: crypto.randomUUID(),
            name: file.name,
            path: file.path
        })

        setAppImage(appImage)
    }

    const handleCreateTrayApp = async (e: FormEvent, appImage: AppImage | null) => {
        e.preventDefault();

        const fields = new FormData(e.target as HTMLFormElement);

        const name = fields.get("trayAppName");

        if (!name) return

        if (typeof name !== "string") return

        if (!appImage) return

        addTrayApp({ name }, appImage)
    }

    return <EuiPanel color="accent">
        <EuiForm component="form" onSubmit={(e) => handleCreateTrayApp(e, appImage)}>
            <EuiFormRow label="Name">
                <EuiFieldText name="trayAppName" />
            </EuiFormRow>
            <EuiFormRow label="App Icon">
                <>
                    <EuiButton onClick={handleSelectImage}>Select App Icon</EuiButton>
                    {appImage && <EuiIcon size="xxl" type={convertFileSrc(appImage.path)} />}
                </>
            </EuiFormRow>

            <EuiButton type="submit">Add Tray App</EuiButton>
        </EuiForm>
    </EuiPanel>



}
