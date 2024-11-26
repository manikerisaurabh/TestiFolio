"use client";

import React, { useEffect } from "react";
import { Space } from "./CreateNewSpace";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
// import { useSelectedSpace } from "./SelectedSpaceContext";
import { useSelectedSpace } from "@/context/SelectedSpaceContext";
import Link from "next/link";

interface SpaceCardProps {
    spaces: Space[];
}

const SpaceCard: React.FC<SpaceCardProps> = ({ spaces }) => {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { selectedSpace, setSelectedSpace } = useSelectedSpace();

    useEffect(() => {
        console.log("SpaceCard component mounted");
    }, []);

    // const addNewSpaceButtonClickHandle = () => {
    //     router.replace("/add-new-space"); // Navigate to /add-new-space
    // };

    const viewSpaceInfoClickHandle = (space: Space) => {
        setSelectedSpace(space); // Update the context
        router.push(`/space/${space._id}`);
    };

    return (
        <div className="p-4">
            {/* Container for the button */}
            <div className="flex justify-between items-center mb-6">
                <Link
                    className="ml-auto px-4 py-2 text-white rounded shadow font-semibold flex flex-row gap-3"
                    style={{ backgroundColor: "rgb(93 93 255)" }}
                    href={`/add-new-space`}
                >
                    <Plus />
                    Create New Space
                </Link>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaces.map((space) => (
                    <div
                        key={space._id}
                        className="p-6 bg-gray-800 flex flex-col gap-8 rounded w-full"
                    >
                        {/* First Row */}
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                {space.spaceLogo ? (
                                    <img
                                        src={space.spaceLogo}
                                        alt={space.spaceName}
                                        className="object-cover rounded-md h-10 w-10"
                                    />
                                ) : (
                                    <div className="h-10 w-10 bg-gray-600 rounded-md flex items-center justify-center">
                                        <span className="text-white text-sm">No Image</span>
                                    </div>
                                )}
                                <button
                                    className="text-white text-lg font-medium"
                                    onClick={() => viewSpaceInfoClickHandle(space)}
                                >
                                    {space.spaceName}
                                </button>
                            </div>
                            <h1 className="text-gray-400">Changes</h1>
                        </div>

                        {/* Second Row */}
                        <div
                            className="flex w-full justify-between font-semibold"
                            style={{ color: "rgb(155 169 180)" }}
                        >
                            <h2>Videos : 2</h2>
                            <h2>Text : 5</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpaceCard;
