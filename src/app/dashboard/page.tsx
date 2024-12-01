import React from "react";
import { rubik } from "../fonts/usedFonts";
import OverviewCard from "../components/OverviewCard";
import CreateNewSpace from "../components/CreateNewSpace";
// import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import connectToDb from "../../lib/connetToDb";
import Space from "../models/space.model";
import { currentUser } from "@clerk/nextjs/server";
import TestiMonial from "../models/testimonial.model";

// interface User {
//     id: string;
//     name: string;
// }

// Helper function for retrying
// const fetchUserSessionWithRetry = async (retries: number, delay: number): Promise<User | null> => {
//     for (let i = 0; i < retries; i++) {
//         const cookieStore = cookies();
//         const userSession = (await cookieStore).get("userSession");

//         if (userSession) {
//             return JSON.parse(userSession.value) as User; // Return parsed user
//         }
//         console.log("User session not found, retrying...");
//         // Delay before retrying
//         await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//     return null; // Return null if retries are exhausted
// };

// Fetch total spaces for a user
const getTotalCounts = async (userId: string | undefined) => {
    if (!userId) return { spaceCount: 0, testimonialCount: 0 };

    await connectToDb();

    // Get the count of spaces owned by the user
    const spaceCount = await Space.countDocuments({ owner: userId });

    // Get the count of testimonials linked to the user's spaces
    const spaceIds = await Space.find({ owner: userId }).distinct('_id');
    const testimonialCount = await TestiMonial.countDocuments({ spaceId: { $in: spaceIds } });

    return { spaceCount, testimonialCount };
};



const Dashboard = async () => {
    // const user = await fetchUserSessionWithRetry(5, 5000); // Retry 5 times with a 1-second delay
    const user = await currentUser();
    const { spaceCount, testimonialCount } = user
        ? await getTotalCounts(user.id)
        : { spaceCount: 0, testimonialCount: 0 }; return (
            <div className="min-h-screen px-8 py-8 sm:px-28 sm:mt-40 sm:py-28 lg:px-12 lg:py-12 xl:px-48 xl:py-48 text-white flex flex-col gap-12">
                <Navbar />
                <div className="flex flex-col gap-6">
                    <strong
                        className={`${rubik.className} font-extrabold text-2xl sm:text-3xl lg:text-4xl`}
                    >
                        Overview
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <OverviewCard cardTitle="Total Testimonials" cardLogo="video" count={`${testimonialCount}`} />
                        <OverviewCard cardTitle="Total Space" cardLogo="space" count={(spaceCount).toString()} />
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
