import { Link } from "wouter"
import { CreateTrayAppForm } from "../components/CreateTrayAppForm"
import { Routes } from "./Routes"

export const CreateTrayApp = () => {
    return <>
        <Link href={Routes.HOME}>Home</Link>
        <CreateTrayAppForm />
    </>
}
