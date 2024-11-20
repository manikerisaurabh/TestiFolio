
import React from 'react';
import { FolderPlus } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import Profile from './Profile';
import Link from 'next/link';

const CreateNewSpace = () => {

    return (
        <div className="p-6 bg-gray-800 rounded-md flex flex-col items-center gap-4">
            <FolderPlus className="h-10 w-10 text-white" />
            <strong className="text-center text-xl">No Space Yet</strong>
            <p className='text-slate-500'>Create your first space to start collecting testimonials</p>
            <Link className='flex flex-row gap-2  px-2 py-2 rounded'
                style={{ backgroundColor: 'rgb(93 93 255/var(--tw-bg-opacity))' }} href={'/add-new-space'}
            ><CirclePlus /> Create a new space</Link>
            <Profile />
        </div>
    );
};

export default CreateNewSpace;
