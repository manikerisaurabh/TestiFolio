import React from 'react'
import { doto, rubik } from '../fonts/usedFonts';
import { Video } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { BriefcaseBusiness } from 'lucide-react';
import { CircleFadingArrowUp } from 'lucide-react';


interface OverviewCardProps {
    cardTitle: string;
    cardLogo: string;
    count: string
}
const OverviewCard: React.FC<OverviewCardProps> = ({ cardLogo, cardTitle, count }) => {
    return (
        <div className='px-8 py-8 bg-pink-400  rounded flex flex-col gap-8'
            style={{ backgroundColor: 'rgb(37 40 44/var(--tw-bg-opacity))' }}
        >
            <div className='flex flex-1 justify-between gap-52'>
                <h1 className="whitespace-nowrap">{cardTitle}</h1>
                {cardLogo == "video" ? <Video /> : ""}
                {cardLogo == "space" ? <LayoutGrid /> : ""}
                {cardLogo == "plan" ? <BriefcaseBusiness /> : ""}
            </div>
            <div className='flex flex-row justify-between'>
                <h2 className={`${count == "Starter" ? rubik.className : doto.className} text-3xl`}>{count}</h2>
                {count === "Starter" ? <>
                    <button className='bg-white text-black rounded px-4 py-2 font-bold flex flex-row justify-between gap-2'><CircleFadingArrowUp /> Upgrade</button>
                </> : <></>}
            </div>
        </div>
    )
}

export default OverviewCard