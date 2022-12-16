import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import type { NFT } from '../../types'

type Props = {
    nft: NFT
}

const NftContainer: React.FC<Props> = ({ nft }) => {
    const { push } = useRouter();

    const handleClick = () => {
        push(`/assets/${nft.token_address}/${nft.token_id}`)
    }

    return (
        <div className='w-[12rem] h-[20rem] p-5 ml-5 mb-5 rounded-xl flex flex-col cursor-pointer hover:scale-110 transition shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
            onClick={handleClick}>
            <div className='w-full min-h-[%50] max-h-[50%] flex items-center justify-center'>
                <Image src={nft.normalized_metadata.image} width={200} height={200} alt="image" />
            </div>
            <div className='mt-5'>
                <p>{nft.normalized_metadata.name}</p>
                <p className='font-bold'>Amount {nft.normalized_metadata.attributes[0].value}</p>
            </div>
        </div>
    )
}

export default NftContainer