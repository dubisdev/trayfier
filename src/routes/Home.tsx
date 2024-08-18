import { CreateTrayAppForm } from "../components/CreateTrayAppForm";
import { LayoutBase } from "../layouts/LayoutBase"
import { TrayAppInfo } from "../modules/TrayApp/components/TrayAppInfo";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";
import { useState } from "react";

export const Home = () => {
    const [openModal, setOpenModal] = useState(false)
    const { trayApps } = useTrayAppsStore()

    return <LayoutBase>

        <h1>TrayFier</h1>
        <button onClick={() => setOpenModal(!openModal)}>Create Tray App</button>

        {openModal && <CreateTrayAppForm />}

        <ul style={{ padding: 0 }}>
            {
                trayApps.map((trayApp) =>
                    <li key={trayApp.id} style={{ listStyle: "none", margin: "10px 0" }}>
                        <TrayAppInfo app={trayApp} />
                    </li>
                )
            }
        </ul>

    </LayoutBase>
}
