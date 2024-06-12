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
        <img src={trayApp.icon} alt={trayApp.name} />
        <span>{trayApp.name}</span>
        <button onClick={handleDeleteTrayApp}>Delete</button>
    </div>
}
