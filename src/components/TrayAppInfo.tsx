import { convertFileSrc } from "@tauri-apps/api/core"
import { TrayApp } from "../modules/TrayApp/domain/TrayApp"
import { useTrayAppsStore } from "../stores/useTrayAppsStore"

type TrayAppInfoProps = {
    trayApp: TrayApp
}

export const TrayAppInfo = ({ trayApp }: TrayAppInfoProps) => {
    const { deleteTrayApp } = useTrayAppsStore()

    const handleDeleteTrayApp = () => {
        deleteTrayApp(trayApp)
    }

    return <div>
        <img src={convertFileSrc(trayApp.appImage.path)} alt={trayApp.name} />
        <h5>{trayApp.name}</h5>
        <button onClick={handleDeleteTrayApp}>Delete</button>
    </div>
}
