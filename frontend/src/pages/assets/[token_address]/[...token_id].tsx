import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Moralis from 'moralis';
import { EvmChain, EvmNftMetadata, } from '@moralisweb3/common-evm-utils';
import ImageContainer from '../../../components/ImageContainer';
import Header from '../../../components/Header';

import { useContract, useBalance, useSigner, useContractWrite } from 'wagmi';
import { ABI, ADDRESS } from '../../../constants';
import type { NFT } from '../../../types';
import { ethers } from 'ethers';


interface Props {
    user: any;
    nft: NFT;
}

function NftShowPage({ nft, user }: Props) {
    const router = useRouter();

    const { token_address } = router.query;

    const { data: signer, isError, isLoading } = useSigner()

    const contract = useContract({
        contractInterface: ABI,
        addressOrName: ADDRESS,
        signerOrProvider: signer
    });

    const ownedBy = nft.owner_of.toUpperCase() === user.address.toUpperCase() ? 'You' : nft.owner_of;


    const handleListNft = async () => {
    }

    return (
        <>
            <Head>
                <title>{nft?.name}-{nft?.normalized_metadata?.name}</title>

            </Head>
            <Header />
            <div className='h-screen p-10 '>
                <div className='flex flex-row'>
                    <div>
                        <ImageContainer src={nft?.normalized_metadata.image} alt={nft?.name} />
                    </div>
                    <div className='px-5 pt-5 font-poppins'>
                        <p className='text-blue-600 text-xl'>{nft?.name}</p>
                        <p className='text-3xl font-bold mt-5'>{nft?.normalized_metadata?.name}</p>
                        <div className='flex'>
                            <h3> Owned By</h3>
                            <h3 className='text-blue-600 pl-1'>
                                {ownedBy}
                            </h3>
                        </div>
                        <button onClick={handleListNft}>
                            List Item
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    if (!Moralis.Core.isStarted) {
        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    }

    const { token_address, token_id } = context.query;

    if (!token_address || !token_id) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    const nft = await Moralis.EvmApi.nft.getNFTMetadata({
        chain: EvmChain.GOERLI,
        address: token_address as string,
        tokenId: token_id as string,
        normalizeMetadata: true
    });

    return {
        props: {
            user: session.user,
            nft: nft?.raw
        },
    };
}
export default NftShowPage;
