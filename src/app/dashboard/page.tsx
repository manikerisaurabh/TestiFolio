import React from 'react';
import { rubik } from '../fonts/usedFonts';
import OverviewCard from '../components/OverviewCard';
import CreateNewSpace from '../components/CreateNewSpace';
import { cookies } from "next/headers";
import { User } from '../components/NavbarProfile';

const Dashboard = async () => {
    const cookieStore = cookies();
    const userSession = (await cookieStore).get("userSession");
    console.log('session data : ', userSession)
    const user: User = userSession ? JSON.parse(userSession.value) : null;
    const checkUserInDb = async () => {
        try {
            const res = await fetch('/api/check-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.id })
            });
            const data = await res.json();
            console.log({ data })
        } catch (error) {
            console.log("error while checking user in db : ", error)
        }
    }

    return (
        <div className="min-h-screen px-8 py-8 sm:px-28 sm:py-28 lg:px-12 lg:py-12 xl:px-48 xl:py-48 text-white flex flex-col gap-12">
            <div className="flex flex-col gap-6">
                <strong className={`${rubik.className} font-extrabold text-2xl sm:text-3xl lg:text-4xl`}>Overview</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    <OverviewCard cardTitle="Total Videos" cardLogo="video" count="10/10" />
                    <OverviewCard cardTitle="Total Space" cardLogo="space" count="10" />
                    <OverviewCard cardTitle="Current Plan" cardLogo="plan" count="Starter" />
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <strong className={`${rubik.className} font-extrabold text-2xl sm:text-3xl lg:text-4xl`}>Spaces</strong>
                <CreateNewSpace />
            </div>
        </div>
    );
};

export default Dashboard;
