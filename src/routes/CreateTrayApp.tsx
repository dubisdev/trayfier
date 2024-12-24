import { Link, useLocation } from "wouter"
import { CreateTrayAppForm } from "../components/CreateTrayAppForm"
import { Routes } from "./Routes"

export const CreateTrayApp = () => {
    const [, navigate] = useLocation()

    const redirectToHome = () => navigate(Routes.HOME)

    return <>
        <Link href={Routes.HOME}>Home</Link>
        <CreateTrayAppForm onCreated={redirectToHome} />
    </>
}
