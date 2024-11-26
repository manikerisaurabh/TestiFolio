import { Pencil, PenLine, Video } from 'lucide-react';
import React from 'react'
interface SelectedSpaceTopBarProps {
    spaceLogo: string;
    spaceName: string;
    textCount: number;
    videoCount: number;
}
const SelectedSpaceTopBar: React.FC<SelectedSpaceTopBarProps> = ({ spaceLogo, spaceName, textCount, videoCount }) => {
    return (
        <div className="flex flex-row justify-between py-10 px-2">
            <div className="flex flex-row items-center gap-4">

                <div>
                    <img src={spaceLogo} alt="" height={60} width={60} />
                </div>
                <h2 className='font-bold text-4xl  '>{spaceName}</h2>
            </div>

            <div className="flex flex-row gap-6">
                <div className="flex flex-col px-2 items-center">
                    <span className="flex flex-row gap-2">
                        <p className='text-gray-500'><Video /></p>
                        <p className='font-semibold text-gray-500' >Video Credit</p>
                    </span>
                    <span className='font-bold'>{videoCount}</span>
                </div>
                <div className="flex flex-col px-2 items-center">
                    <span className="flex flex-row gap-2">
                        <p className='text-gray-500'><PenLine /></p>
                        <p className='font-semibold text-gray-500'>Text Credit</p>
                    </span>
                    <span className='font-bold'>{textCount}</span>
                </div>

                <button
                    className='flex flex-row gap-3 bg-white text-black items-center px-4 py-0 border rounded  font-semibold'
                ><Pencil /> Edit space</button>
            </div>


        </div>
    )
}

export default SelectedSpaceTopBar