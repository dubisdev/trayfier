type IconProps = {
    src: string
    altName: string
}

export const Icon = ({ src, altName }: IconProps) => {
    return <img src={src} alt={altName} width={30} height={30} />
}
