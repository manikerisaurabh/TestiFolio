"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

interface User {
    firstName: string;
    id: string;
    imageUrl: string;
    lastName: string;

}



const NavbarProfile = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        console.log("in navbar")
        getUserInfo();
    }, [])

    useEffect(() => {
        console.log({ user })
    }, [user])


    const getUserInfo = async () => {
        try {
            const response = await fetch('/api/get-clerk-user');
            const data = await response.json();
            console.log({ data })
            setUser(data.user)
        } catch (error) {
            console.log('Error while fetching user data : ', error)
        }
    }
    return (
        <div className="flex items-center">
            {user ?
                <img src={user.imageUrl} alt={'profile image'} width={40} height={40} className='rounded' style={{ borderRadius: '50%' }} />

                :
                <Link href={'/dashboard'} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Lets Get Started</Link>
            }
        </div>
    )
}

export default NavbarProfile