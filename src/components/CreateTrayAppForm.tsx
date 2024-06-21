import { FormEvent } from "react";
import { useTrayAppsStore } from "../stores/useTrayAppsStore";

export const CreateTrayAppForm = () => {
    const { addTrayApp } = useTrayAppsStore()

    const handleCreateTrayApp = async (e: FormEvent) => {
        e.preventDefault();

        const fields = new FormData(e.target as HTMLFormElement);

        const name = fields.get("trayAppName");

        if (!name) return

        if (typeof name !== "string") return

        addTrayApp({ name, icon: "./icons/icon.png" })
    }

    return <form onSubmit={handleCreateTrayApp}>

        <label htmlFor="trayAppName">Name</label>
        <input id="trayAppName" name="trayAppName" />

        <button type="submit">Add Tray App</button>
    </form>
}
