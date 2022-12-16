import React from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';


interface Props {
    walletAddress: string,
    options?: {
        title: string,
        description: string,
        buttonText: string,
        buttonOnClick: () => void,
    }
}



const WalletWidget: React.FC<Props> = ({ walletAddress, options }) => {
    const router = useRouter();
    const smallWalletAddress = walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : null;

    const handleSignOut = async () => {
        await signOut();
        router.push('/', '/', { shallow: true });
    }

    return (
        <button
            className='text-white border-gray-400 h-12 border-y-2
             border-x-2 rounded-lg text-lg w-fit p-5 items-center justify-center flex cursor-pointer'
            type='button'
            onClick={() => { handleSignOut() }}
        >
            {walletAddress ? smallWalletAddress : "Connect Wallet"}
        </button>
    )
}

export default WalletWidget