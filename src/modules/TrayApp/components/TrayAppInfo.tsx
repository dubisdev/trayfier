import { convertFileSrc } from "@tauri-apps/api/core"
import { useTrayAppsStore } from "../../../stores/useTrayAppsStore"
import { TrayApp } from "../domain/TrayApp"
import { Icon } from "./Icon"

export const TrayAppInfo = ({ app }: { app: TrayApp }) => {
    const { name, iconSrc } = app

    const deleteTrayApp = useTrayAppsStore(s => s.deleteTrayApp)

    const handleDeleteTrayApp = () => {
        deleteTrayApp(app)
    }

    return <div style={{
        display: "flex",
        padding: "10px",
        justifyContent: "space-between",
        border: "1px solid black",
        borderRadius: "5px",
    }}>
        <Icon src={convertFileSrc(iconSrc)} altName={name} />

        <span>{name}</span>

        <button onClick={handleDeleteTrayApp}>Delete</button>
    </div>
}
