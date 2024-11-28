import { Pencil, PenLine, Video } from 'lucide-react';
import React from 'react';

interface SelectedSpaceTopBarProps {
    spaceLogo: string;
    spaceName: string;
    textCount: number;
    videoCount: number;
}

const SelectedSpaceTopBar: React.FC<SelectedSpaceTopBarProps> = ({
    spaceLogo,
    spaceName,
    textCount,
    videoCount,
}) => {
    const isLoading = !spaceLogo || !spaceName;

    return (
        <div className="flex flex-col md:flex-row justify-between py-6 px-4 gap-6 md:gap-0">
            {/* Left Section */}
            <div className="flex flex-row items-center gap-4">
                <div>
                    {isLoading ? (
                        <div className="h-16 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                    ) : (
                        <img
                            src={spaceLogo}
                            alt="Space Logo"
                            height={60}
                            width={60}
                            className="rounded-full"
                        />
                    )}
                </div>
                <h2
                    className={`font-bold text-xl md:text-4xl ${isLoading ? 'bg-gray-300 w-36 h-6 md:w-48 md:h-8 animate-pulse' : ''
                        }`}
                >
                    {isLoading ? '' : spaceName}
                </h2>
            </div>

            {/* Right Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-6 items-start md:items-center">
                {/* Video Credit */}
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-gray-500">
                            <Video />
                        </p>
                        <p className="font-semibold text-gray-500 text-sm md:text-base">
                            Video Credit
                        </p>
                    </div>
                    <span className="font-bold text-lg md:text-xl ml-2">
                        {isLoading ? (
                            <div className="h-6 w-10 bg-gray-300 rounded animate-pulse"></div>
                        ) : (
                            videoCount
                        )}
                    </span>
                </div>

                {/* Text Credit */}
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-gray-500">
                            <PenLine />
                        </p>
                        <p className="font-semibold text-gray-500 text-sm md:text-base">
                            Text Credit
                        </p>
                    </div>
                    <span className="font-bold text-lg md:text-xl ml-2">
                        {isLoading ? (
                            <div className="h-6 w-10 bg-gray-300 rounded animate-pulse"></div>
                        ) : (
                            textCount
                        )}
                    </span>
                </div>

                {/* Edit Space Button */}
                <button
                    className={`flex flex-row gap-3 items-center px-4 py-2 border rounded font-semibold ${isLoading ? 'bg-gray-300 text-gray-400 animate-pulse' : 'bg-white text-black'
                        }`}
                    disabled={isLoading}
                >
                    <Pencil />
                    {isLoading ? '' : 'Edit Space'}
                </button>
            </div>
        </div>
    );
};

export default SelectedSpaceTopBar;
