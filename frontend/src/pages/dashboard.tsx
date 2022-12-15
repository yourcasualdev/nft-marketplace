import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';

interface NFT {
    amount: string;
    block_number: string;
    block_number_minted: string;
    contract_type: string;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata: {
        name: string;
        description: string;
        image: string;
        attributes: {
            trait_type: string,
            value: number
        }[];
    }
    minter_address: string;
    name: string;
    owner_of: string;
    symbol: string;
    token_address: string;
    token_hash: string;
    token_id: string;
    token_uri: string;
}

function Protected({ nftList, user }: InferGetStaticPropsType<typeof getServerSideProps>) {
    const [nfts, setNfts] = useState<NFT[]>([]);

    useEffect(() => {
        setNfts(nftList);
    }, [nftList]);

    return (
        <div className='bg-[#050014] text-white h-screen'>
            <h1 className='text-3xl'>DashBoard</h1>
            <div>
                {nfts.map((nft) => (
                    <div key={nft.token_id}>
                        <p>{nft.name}</p>
                        <p>{nft.token_id}</p>
                        <Image src={nft.metadata.image} width={100} height={100} alt="image" />
                        <p className='font-bold'>Amount {nft.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export async function getServerSideProps(context) {
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

    const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
        chain: EvmChain.GOERLI,
        address: session.user?.address
    });

    let serializedNftList: NFT[] = [];

    // serialize the nftList
    if (nftList.raw.result && nftList.raw.result.length > 0) {
        serializedNftList = nftList.raw.result.map((nft) => {
            return {
                ...nft,
                metadata: JSON.parse(nft.metadata || ''),
            }
        });
    }

    return {
        props: {
            user: session.user,
            nftList: serializedNftList,
        },
    };
}
export default Protected;
