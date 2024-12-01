
// import React from 'react';
// import { FolderPlus } from 'lucide-react';
// import { CirclePlus } from 'lucide-react';
// import Profile from './Profile';
// import Link from 'next/link';

// const CreateNewSpace = () => {

//     return (
//         <div className="p-6 bg-gray-800 rounded-md flex flex-col items-center gap-4">
//             <FolderPlus className="h-10 w-10 text-white" />
//             <strong className="text-center text-xl">No Space Yet</strong>
//             <p className='text-slate-500'>Create your first space to start collecting testimonials</p>
//             <Link className='flex flex-row gap-2  px-2 py-2 rounded'
//                 style={{ backgroundColor: 'rgb(93 93 255/var(--tw-bg-opacity))' }} href={'/add-new-space'}
//             ><CirclePlus /> Create a new space</Link>
//             <Profile />
//         </div>
//     );
// };

// export default CreateNewSpace;


import React from 'react';
import { FolderPlus } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import Profile from './Profile';
import Link from 'next/link';
import SpaceCard from './SpaceCard';
import { currentUser } from '@clerk/nextjs/server';

interface Testimonial {
    createdAt: Date;
    imageUrl: string;
    isLiked: boolean;
    message: string;
    permissionToShare: boolean;
    rating: string;
    spaceId: string;
    testimonialType: string;
    userEmail: string;
    userImage: string;
    userName: string;
    _id: string;
}


export interface Space {
    customMessage: string;
    headerTitle: string;
    owner: string;
    questions: string[];
    spaceLogo: string;
    spaceName: string;
    _id: string;
}

export interface CurrSpace {
    customMessage: string;
    headerTitle: string;
    owner: string;
    questions: string[];
    spaceLogo: string;
    spaceName: string;
    _id: string;
    testimonials: Testimonial[];
}




const getAllSpace = async (userId: string): Promise<CurrSpace[]> => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/space/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
            cache: 'no-store', // Ensures it fetches fresh data each time
        });


        const data = await res.json();
        console.log(data)
        return data || [];
    } catch (error) {
        console.error('Error fetching spaces:', error);
        return [];
    }
};

const CreateNewSpace = async () => {
    const user = await currentUser();

    const spaces: CurrSpace[] = await getAllSpace(user?.id ? user.id : "");

    if (spaces.length > 0) {
        return (
            <div>
                <SpaceCard spaces={spaces} />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-800 rounded-md flex flex-col items-center gap-4">
            <FolderPlus className="h-10 w-10 text-white" />
            <strong className="text-center text-xl">No Space Yet</strong>
            <p className="text-slate-500">Create your first space to start collecting testimonials</p>
            <Link
                className="flex flex-row gap-2 px-2 py-2 rounded"
                style={{ backgroundColor: 'rgb(93 93 255/var(--tw-bg-opacity))' }}
                href={'/add-new-space'}
            >
                <CirclePlus /> Create a new space
            </Link>
            <Profile />
        </div>
    );
};

export default CreateNewSpace;

