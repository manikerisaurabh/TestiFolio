"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import appLogo from "../../../../public/logo.png";
import { PencilLine, Video } from "lucide-react";

interface Space {
    customMessage: string;
    headerTitle: string;
    owner: string;
    questions: string[];
    spaceLogo: string;
    spaceName: string;
    _v: number;
    _id: string;
}

const Page = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const [userId, rawSpaceName] = pathSegments;
    const spaceName = rawSpaceName.replace(/-/g, " ");
    const [spaceInfo, setSpaceInfo] = useState<Space>();

    const getSpaceInfo = async () => {
        try {
            const response = await fetch("/api/get-space-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, spaceName: spaceName }),
            });
            const data = await response.json();
            setSpaceInfo(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSpaceInfo();
    }, []);

    useEffect(() => {
        console.log({ spaceInfo });
    }, [spaceInfo]);

    return (
        <div
            className="flex flex-col min-h-screen px-4 py-6 bg-white items-center"
            style={{ backgroundColor: "white" }}
        >
            {/* Header */}
            <div className="flex flex-row justify-start items-center fixed left-0 gap-4 w-full max-w-6xl">
                <Image src={appLogo} height={60} width={60} alt={""} />
                <strong className="text-slate-600 text-3xl md:text-4xl">Testimonial</strong>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center gap-8 w-full max-w-lg mt-16">
                {/* Space Logo */}
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                        src={spaceInfo?.spaceLogo}
                        alt={spaceInfo?.spaceName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Title and Message */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        {spaceInfo?.headerTitle}
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl mt-3 font-semibold">
                        {spaceInfo?.customMessage}
                    </p>
                </div>

                {/* Questions Section */}
                <div className="w-full">
                    <h3 className="font-bold text-2xl text-gray-700 mb-4">QUESTIONS</h3>
                    <div className="h-2 w-16 bg-blue-500 mb-6"></div>
                    <ul className="list-disc list-inside space-y-4 text-lg md:text-xl">
                        {spaceInfo &&
                            spaceInfo.questions.map((question, index) => (
                                <li key={index} className="text-gray-600 font-semibold">
                                    {question || `Question ${index + 1}`}
                                </li>
                            ))}
                    </ul>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 w-full">
                    <button
                        className="w-full py-3 text-xl md:text-xl   rounded flex items-center justify-center gap-3 text-white bg- font-bold hover:bg-blue-700"
                        style={{ backgroundColor: 'rgb(93 93 255)' }}
                    >
                        <Video size={24} /> Record a video
                    </button>
                    <button
                        className="w-full py-3 text-xl md:text-xl   rounded flex items-center justify-center gap-3 text-white bg-gray-800 hover:bg-gray-950 font-bold"
                    >
                        <PencilLine size={24} /> Send a text
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
