import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { useEvmNativeBalance } from '@moralisweb3/next'
import { GetServerSideProps } from 'next';
import type { NFT } from '../types';
import NftContainer from '../components/NftContainer';
import Header from '../components/Header';

interface Props {
    user: any;
    nftList: NFT[];
    url: string;
}

function Dashboard({ nftList, user, url }: Props) {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const { data: nativeBalance } = useEvmNativeBalance({ address: user.address });

    useEffect(() => {
        setNfts(nftList);
        console.log(url);
    }, [nftList, url]);

    return (
        <>
            <Header />
            <div className='bg-[#ffffff]  h-screen w-full p-8'>
                <h1 className='text-3xl font-bold'>DashBoard</h1>
                <div>
                    <h1 className='text-2xl font-bold'></h1>
                    <div className='flex flex-row mt-10'>
                        {nfts.map((nft) => (
                            <NftContainer key={nft.token_hash} nft={nft} />
                        ))}
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

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: EvmChain.GOERLI,
        //TODO Fix this typing too
        // @ts-ignore
        address: session.user?.address,
        normalizeMetadata: true,
    });

    if (!response) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    const nftList = response.raw.result;

    return {
        props: {
            user: session?.user,
            nftList: nftList,
            url: process.env.NEXTAUTH_URL,
        },
    };
}
export default Dashboard
