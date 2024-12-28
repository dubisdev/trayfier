import { PropsWithChildren } from "react";

type LayoutBaseProps = PropsWithChildren<{
    pageTitle: string
    actionButton?: React.ReactNode
}>

export const LayoutBase = ({ children, pageTitle, actionButton }: LayoutBaseProps) => {
    return <div className="p-5 h-full min-w-96">
        <div className="h-12 flex justify-between">
            <h1 className="font-bold text-2xl">{pageTitle}</h1>
            {actionButton}
        </div>
        <main className="h-full">
            {children}
        </main>
    </div>
}
