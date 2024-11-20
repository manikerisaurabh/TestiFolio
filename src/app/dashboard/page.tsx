import React from 'react';
import { rubik } from '../fonts/usedFonts';
import OverviewCard from '../components/OverviewCard';

const Dashboard = () => {
    return (
        <div className="h-[100vh] px-4 py-4 sm:px-8 sm:py-8 lg:px-16 lg:py-16 xl:px-48 xl:py-48 text-white flex flex-col gap-8">
            <div className='flex flex-col gap-8'>

                <strong className={`${rubik.className} text-white font-extrabold text-4xl`}>Overview</strong>
                <div className='flex flex-row justify-between gap-8'>
                    <OverviewCard cardTitle={'Total Videos'} cardLogo={"video"} count={'10/10'} />
                    <OverviewCard cardTitle={'Total Space'} cardLogo={"space"} count={'10'} />
                    <OverviewCard cardTitle={'Current Plan'} cardLogo={"plan"} count={'Starter'} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
