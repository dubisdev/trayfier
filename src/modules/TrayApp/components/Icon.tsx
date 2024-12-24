type IconProps = {
    src: string
    altName: string
}

export const Icon = ({ src, altName }: IconProps) => {
    return <img style={{ objectFit: "contain", borderRadius: "5px" }} src={src} alt={altName} width={30} height={30} />
}
