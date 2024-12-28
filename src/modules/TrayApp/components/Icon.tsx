type IconProps = {
    src: string
    altName: string
}

export const Icon = ({ src, altName }: IconProps) => {
    return <img className="object-contain rounded-md w-8 h-8" src={src} alt={altName} />
}
