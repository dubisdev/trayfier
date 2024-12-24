import { PropsWithChildren } from "react";

type LayoutBaseProps = PropsWithChildren<{
    pageTitle: string
}>

export const LayoutBase = ({ children, pageTitle }: LayoutBaseProps) => {
    return <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0"
    }}>
        <div style={{ height: "50px", width: "100%" }}>
            <h1>{pageTitle}</h1>
        </div>
        <main style={{ height: "100%", width: "100%" }}>
            {children}
        </main>
    </div>
}
