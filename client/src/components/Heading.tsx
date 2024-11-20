interface HeadingProps{
    text: string;
}

export const Heading = ({text}: HeadingProps)=>{
    return <div className="font-bold text-4xl p-6">
        {text}
    </div>
}