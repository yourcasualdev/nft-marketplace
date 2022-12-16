import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';
import Header from '../components/Header';

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const { push } = useRouter();

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const { message } = await requestChallengeAsync({ address: account, chainId: chain.id });

        const signature = await signMessageAsync({ message });

        // redirect user after success authentication to '/user' page
        const { url } = await signIn('moralis-auth', { message, signature, redirect: false, callbackUrl: '/dashboard' });
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    return (
        <>
            <Header />
            <div className='flex items-center justify-center h-screen'>
                <div className='w-6/12 min-w-[30rem] min-h-[35rem] border-gray-200 border-y-2 border-x-2 rounded-2xl shadow-md'>
                    <div className='w-full h-4/12 text-center pt-32 font-poppins text-3xl font-bold'>
                        <h3>Authanticate using your wallet</h3>
                    </div>
                    <div className='w-full h-[12rem] mt-20 flex flex-col items-center justify-center'>
                        <button
                            className='mt-2 w-[20rem] h-[4rem] bg-white rounded-full flex items-center justify-between p-5 border-gray-200 border-y-2 border-x-2 hover:scale-110 transition shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
                            onClick={handleAuth}
                        >
                            <h1 className='font-poppins font-bold'>Use Metamask</h1>
                            <img className='w-12 justify-self-end' src='https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg' />
                        </button>
                        <button
                            className='mt-2 w-[20rem] h-[4rem] bg-white rounded-full flex items-center justify-between p-5 border-gray-200 border-y-2 border-x-2 hover:scale-110 transition shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
                            onClick={handleAuth}
                        >
                            <h1 className='font-poppins font-bold'>Coinbase Wallet</h1>
                            <img className='w-12 justify-self-end' src='https://static.opensea.io/logos/walletlink-alternative.png' />
                        </button>
                        <button
                            className='mt-2 w-[20rem] h-[4rem] bg-white rounded-full flex items-center justify-between p-5 border-gray-200 border-y-2 border-x-2 hover:scale-110 transition shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
                            onClick={handleAuth}
                        >
                            <h1 className='font-poppins font-bold'>Use Core</h1>
                            <img className='w-12 justify-self-end' src='https://lh3.googleusercontent.com/uSYrwIYFZ-7kwg0-P_0YKubeNhFUN_jGg9J8bPbCOYjwW94jbFCEMqHUaV35sn0bvqujkuy6M72gjIRD4NTCirsQpXc=s48' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;

