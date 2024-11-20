import React from 'react'
import { currentUser } from '@clerk/nextjs/server'

const Profile = async () => {
    const user = await currentUser();
    return (
        <div>
            {user ? user.username : ""}
        </div>
    )
}

export default Profile