import { Link, useLocation } from "wouter"
import { CreateTrayAppForm } from "../components/CreateTrayAppForm"
import { Routes } from "./Routes"
import { LayoutBase } from "@/layouts/LayoutBase"
import { Button } from "@/components/ui/button"

export const CreateTrayApp = () => {
    const [, navigate] = useLocation()

    const redirectToHome = () => navigate(Routes.HOME)

    return <LayoutBase
        pageTitle="Create new TrayApp"
        actionButton={
            <Button asChild>
                <Link href={Routes.HOME}>
                    Cancel
                </Link>
            </Button>
        }>
        <CreateTrayAppForm onCreated={redirectToHome} />
    </LayoutBase>
}
