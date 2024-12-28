type IconProps = {
    src: string
    altName: string
}

export const Icon = ({ src, altName }: IconProps) => {
    return <img className="object-contain rounded-md w-12 h-12" src={src} alt={altName} />
}
