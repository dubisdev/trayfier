import { PropsWithChildren } from "react";

type LayoutBaseProps = PropsWithChildren<{
    pageTitle: string
}>

export const LayoutBase = ({ children, pageTitle }: LayoutBaseProps) => {
    return <div className="flex flex-col items-center p-5 w-dvw h-dvh">
        <div className="h-12 w-full">
            <h1 className="font-bold text-xl">{pageTitle}</h1>
        </div>
        <main className="h-full w-full">
            {children}
        </main>
    </div>
}
