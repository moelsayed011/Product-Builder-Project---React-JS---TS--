interface IProps {
imageURL: string;
alt : string;
className?: string;
}


export const Image = ({imageURL,alt ,className} : IProps) => {
    return<>
        <img src={imageURL} alt={alt} className={className} />
    </>
}