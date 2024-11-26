import React from "react";
import { Heart, LucideProps, MessageSquareMore, Video, WalletCards } from "lucide-react";

export interface SidebarContentType {
    label: string; // Fixed typo from "lable"
    isSelected: boolean;
    logo: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const sidebarContentArray: SidebarContentType[] = [
    {
        label: "All",
        isSelected: false,
        logo: WalletCards,
    },
    {
        label: "Video",
        isSelected: false,
        logo: Video,
    },
    {
        label: "Text",
        isSelected: false,
        logo: MessageSquareMore,
    },
    {
        label: "Liked",
        isSelected: false,
        logo: Heart,
    },
    {
        label: "Wall of Love",
        isSelected: false,
        logo: Heart,
    },
];

interface SelectedSpaceSidebarProps {
    onContentSelect: (content: SidebarContentType) => void;
    selectedContent: SidebarContentType | null;
}

const SelectedSpaceSidebar: React.FC<SelectedSpaceSidebarProps> = ({ onContentSelect, selectedContent }) => {
    return (
        <div className="sticky top-28">
            <ul className="flex flex-col justify-center items-center gap-8 px-4 py-4">
                {sidebarContentArray.map((content, index) => (
                    <li
                        key={index}
                        className={`min-w-52 items-center flex flex-row gap-3 hover:bg-purple-700 p-2 rounded ${selectedContent?.label === content.label ? "bg-purple-600" : ""
                            } hover:cursor-pointer`}
                        onClick={() => onContentSelect(content)}
                    >
                        <content.logo className="h-5 w-5 text-gray-700" />
                        <span className="font-semibold">{content.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectedSpaceSidebar;
