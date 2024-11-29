import React from "react";
import { rubik } from "../fonts/usedFonts";
import OverviewCard from "../components/OverviewCard";
import CreateNewSpace from "../components/CreateNewSpace";
import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import connectToDb from "../../lib/connetToDb";
import Space from "../models/space.model";

interface User {
    id: string;
    name: string;
}

// Helper function for retrying
const fetchUserSessionWithRetry = async (retries: number, delay: number): Promise<User | null> => {
    for (let i = 0; i < retries; i++) {
        const cookieStore = cookies();
        const userSession = (await cookieStore).get("userSession");

        if (userSession) {
            return JSON.parse(userSession.value) as User; // Return parsed user
        }
        console.log("User session not found, retrying...");
        // Delay before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return null; // Return null if retries are exhausted
};

// Fetch total spaces for a user
const getTotalSpace = async (userId: string | undefined) => {
    if (!userId) return [];
    await connectToDb();
    const spaces = await Space.find({ owner: userId });
    return spaces;
};

const Dashboard = async () => {
    const user = await fetchUserSessionWithRetry(5, 5000); // Retry 5 times with a 1-second delay
    const spaces = user ? await getTotalSpace(user?.id) : [];
    return (
        <div className="min-h-screen px-8 py-8 sm:px-28 sm:py-28 lg:px-12 lg:py-12 xl:px-48 xl:py-48 text-white flex flex-col gap-12">
            <Navbar />
            <div className="flex flex-col gap-6">
                <strong
                    className={`${rubik.className} font-extrabold text-2xl sm:text-3xl lg:text-4xl`}
                >
                    Overview
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    <OverviewCard cardTitle="Total Videos" cardLogo="video" count="10/10" />
                    <OverviewCard cardTitle="Total Space" cardLogo="space" count={(spaces.length).toString()} />
                    <OverviewCard cardTitle="Current Plan" cardLogo="plan" count="Starter" />
                </div>
            </div>

            {/* Conditional rendering for Spaces section */}
            <div className="flex flex-col gap-6">
                <strong
                    className={`${rubik.className} font-extrabold text-2xl sm:text-3xl lg:text-4xl`}
                >
                    Spaces
                </strong>

                <CreateNewSpace />

            </div>
        </div>
    );
};

export default Dashboard;
