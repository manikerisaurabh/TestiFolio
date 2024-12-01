import React from 'react';
import { doto, rubik } from '../fonts/usedFonts';
import { MessageSquareMore, LayoutGrid, BriefcaseBusiness, CircleFadingArrowUp, LockKeyhole } from 'lucide-react';

interface OverviewCardProps {
    cardTitle: string;
    cardLogo: string;
    count: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ cardLogo, cardTitle, count }) => {
    const renderIcon = () => {
        switch (cardLogo) {
            case 'video':
                return <MessageSquareMore className="h-6 w-6 text-white" />;
            case 'space':
                return <LayoutGrid className="h-6 w-6 text-white" />;
            case 'plan':
                return <BriefcaseBusiness className="h-6 w-6 text-white" />;
            default:
                return null;
        }
    };

    const isLocked = cardTitle === 'Current Plan';

    return (
        <div className="relative">
            {/* Card Content */}
            <div
                className={`p-6 bg-gray-800 rounded-md flex flex-col gap-4 ${isLocked ? 'opacity-50 backdrop-blur-sm' : ''
                    }`}
            >
                <div className="flex items-center justify-between">
                    <h1 className="whitespace-nowrap text-lg font-semibold">{cardTitle}</h1>
                    {renderIcon()}
                </div>
                <div className="flex items-center justify-between">
                    <h2
                        className={`${count === 'Starter' ? rubik.className : doto.className} text-2xl font-bold`}
                    >
                        {count}
                    </h2>
                    {count === 'Starter' && (
                        <button className="opacity-50 backdrop-blur-sm cursor-not-allowed flex items-center gap-2 px-4 py-2 bg-white text-black rounded font-semibold text-sm hover:bg-gray-200">
                            <CircleFadingArrowUp className="h-5 w-5" />
                            Upgrade
                        </button>
                    )}
                </div>
            </div>

            {/* Lock Overlay */}
            {isLocked && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                    <LockKeyhole className="h-12 w-12 text-white" />
                </div>
            )}
        </div>
    );
};

export default OverviewCard;
