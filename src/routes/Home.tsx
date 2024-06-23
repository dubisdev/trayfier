import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiModal, EuiText } from "@elastic/eui";
import { CreateTrayAppForm } from "../components/CreateTrayAppForm";
import { TrayAppInfo } from "../components/TrayAppInfo";
import { LayoutBase } from "../layouts/LayoutBase"
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { useState } from "react";

export const Home = () => {
    const [openModal, setOpenModal] = useState(false)
    const { trayApps } = useTrayAppsStore()

    return <LayoutBase>
        <EuiText>
            <h1>TrayFier</h1>
        </EuiText>
        <EuiButton onClick={() => setOpenModal(!openModal)}>Create Tray App</EuiButton>

        {
            openModal && <CreateTrayAppForm />
        }

        <EuiFlexGroup>
            {
                trayApps.map((trayApp) =>
                    <EuiFlexItem key={trayApp.id} grow={false}>
                        <TrayAppInfo trayApp={trayApp} />
                    </EuiFlexItem>
                )
            }
        </EuiFlexGroup>

    </LayoutBase>
}
