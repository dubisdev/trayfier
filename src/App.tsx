import { useTrayAppsStore } from "./stores/useTrayAppsStore";
import { CreateTrayAppForm } from "./components/CreateTrayAppForm";
import { TrayAppInfo } from "./components/TrayAppInfo";

function App() {
  const { trayApps } = useTrayAppsStore()

  return <>
    <h1>Add a Tray icon to your Tray</h1>

    <CreateTrayAppForm />

    {trayApps.map((trayApp) => <TrayAppInfo key={trayApp.id} trayApp={trayApp} />)}
  </>
}

export default App;
