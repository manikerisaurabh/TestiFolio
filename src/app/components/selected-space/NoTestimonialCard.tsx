"use client"


import { FolderX } from 'lucide-react';
import { FolderPlus } from 'lucide-react';
import Link from 'next/link';

import React from 'react'

interface NoTestimonialCardProps {
    userId: string | undefined;
    spaceId: string;
}


const NoTestimonialCard: React.FC<NoTestimonialCardProps> = ({ userId, spaceId }) => {




    return (
        <div className='text-white flex items-center justify-center'>
            <div className='flex  flex-col gap-6 justify-center items-center'>
                <div className='flex flex-col gap-1 justify-center items-center '>

                    <FolderX className='text-gray-500' height={40} width={40} />
                    <h1 className='font-extrabold text-2xl'>No testimonials yet</h1>
                </div>
                <button
                    className='py-2 px-4 rounded font-semibold flex gap-2 bg-customBlue hover:bg-onHoverCustomBlue'

                ><span><FolderPlus /></span><Link href={`/${userId}/${spaceId}`}>add a testimonial</Link></button>
            </div>
        </div>
    )
}

export default NoTestimonialCard