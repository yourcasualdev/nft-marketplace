import React from 'react'
import { NextComponentType } from 'next'
import { signOut } from 'next-auth/react'


const Header: NextComponentType = () => {
    return (
        <div>
            <button onClick={() => signOut({ callbackUrl: '/signin' })}>Sign out</button>
        </div>
    )
}

export default Header