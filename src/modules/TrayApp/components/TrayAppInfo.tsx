import { Icon } from "./Icon"

type TrayAppInfoProps = {
    iconSrc: string
    appName: string
}

export const TrayAppInfo = ({ appName, iconSrc }: TrayAppInfoProps) => {
    return <div style={{
        display: "flex",
        padding: "10px",
        justifyContent: "space-between",
        border: "1px solid black",
        borderRadius: "5px",
    }}>
        <Icon src={iconSrc} altName={appName} />

        <span>{appName}</span>

        <button>Delete</button>
    </div>
}
