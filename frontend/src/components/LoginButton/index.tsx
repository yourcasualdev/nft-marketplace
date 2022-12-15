import React from 'react'
import { signOut, signIn } from 'next-auth/react'

interface LoginButtonProps {
    title: string
    callbackUrl: string

}

const LoginButton: React.FC<LoginButtonProps> = ({ title, callbackUrl }) => {
    return (
        <div>
            <button
                type='button'
                onClick={() => signOut({ callbackUrl })}
            >{title}</button>
        </div>
    )
}

export default LoginButton