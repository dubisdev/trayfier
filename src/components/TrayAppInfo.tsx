import { TrayApp } from "../features/TrayApp/domain/TrayApp"
import { useTrayAppsStore } from "../stores/useTrayAppsStore"

type TrayAppInfoProps = {
    trayApp: TrayApp
}

export const TrayAppInfo = ({ trayApp }: TrayAppInfoProps) => {
    const { deleteTrayApp } = useTrayAppsStore()

    const handleDeleteTrayApp = async (trayAppId: TrayApp) => {
        deleteTrayApp(trayAppId)
    }

    return <div>
        <img src={trayApp.icon} alt={trayApp.name} />
        <span>{trayApp.name}</span>
        <button onClick={() => handleDeleteTrayApp(trayApp)}>Delete</button>
    </div>
}
