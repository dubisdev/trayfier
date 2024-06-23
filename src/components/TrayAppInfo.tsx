import { convertFileSrc } from "@tauri-apps/api/core"
import { TrayApp } from "../modules/TrayApp/domain/TrayApp"
import { useTrayAppsStore } from "../stores/useTrayAppsStore"
import { EuiButton, EuiCard, EuiIcon } from "@elastic/eui"

type TrayAppInfoProps = {
    trayApp: TrayApp
}

export const TrayAppInfo = ({ trayApp }: TrayAppInfoProps) => {
    const { deleteTrayApp } = useTrayAppsStore()

    const handleDeleteTrayApp = () => {
        deleteTrayApp(trayApp)
    }

    return <EuiCard
        title={trayApp.name}
        icon={<EuiIcon type={convertFileSrc(trayApp.appImage.path)} />}
        footer={
            <EuiButton onClick={handleDeleteTrayApp}>
                Delete
            </EuiButton>
        }

    />




}
