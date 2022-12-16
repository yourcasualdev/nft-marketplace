import React from "react";
import Image from "next/image";

type Props = {
    src: string;
    alt: string;
};

const ImageContainer: React.FC<Props> = ({ src, alt }) => {
    return (
        <div className='w-[50rem] h-[50rem] ml-5 mb-5 rounded-3xl flex justify-center items-center border-gray-200 border-x-2 border-y-2'>
            <Image src={src} alt={alt} width={360} height={360} />
        </div>
    );
};

export default ImageContainer;