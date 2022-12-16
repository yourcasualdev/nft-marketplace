import React, { useEffect } from 'react'
import { NextComponentType } from 'next'
import { signOut, useSession, signIn } from 'next-auth/react'
import WalletWidget from '../WalletWidget';
import Link from 'next/dist/client/link';


const Header: NextComponentType = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <>
            <div className='absolute top-0 left-0 p-5 w-full overflow-x-hidden overflow-y-hidden h-20 bg-[#050014] text-white flex items-center justify-between'>
                <Link href='/dashboard' className='font-bold text-4xl'>WarBots</Link>
                <div className='ml-10'>
                    <input type="text"
                        className='text-white border-gray-400 h-12 border-y-2 border-x-2 bg-black rounded-lg p-5 text-lg font-medium xl:w-[45rem] transition'
                        placeholder='Search for NFTs'
                    />
                </div>
                <div className='flex items-center'>
                    <Link href='/dashboard'>
                        <img src="https://robohash.org/stefan-one" alt="Profile Picture" />
                    </Link>
                    <WalletWidget walletAddress={session?.user?.address} />
                </div>
            </div>
            <div className='pt-20 '>
            </div>
        </>
    )
}

export default Header