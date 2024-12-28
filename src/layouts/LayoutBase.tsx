import { PropsWithChildren } from "react";

type LayoutBaseProps = PropsWithChildren<{
    pageTitle: string
    actionButton?: React.ReactNode
}>

export const LayoutBase = ({ children, pageTitle, actionButton }: LayoutBaseProps) => {
    return <div className="flex flex-col items-center p-5 w-dvw h-dvh gap-2">
        <div className="h-12 w-full flex justify-between">
            <h1 className="font-bold text-2xl">{pageTitle}</h1>
            {actionButton}
        </div>
        <main className="h-full w-full">
            {children}
        </main>
    </div>
}
