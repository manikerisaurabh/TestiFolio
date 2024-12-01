/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Heart, LucideProps, MessageSquareMore, Video, WalletCards, Share } from "lucide-react";


import 'react-toastify/dist/ReactToastify.css'; // Ensure toastify styles are imported

export interface SidebarContentType {
    label: string;
    isSelected: boolean;
    logo: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const sidebarContentArray: SidebarContentType[] = [
    { label: "All", isSelected: true, logo: WalletCards },
    { label: "Video", isSelected: false, logo: Video },
    { label: "Text", isSelected: false, logo: MessageSquareMore },
    { label: "Liked", isSelected: false, logo: Heart },
    { label: "Share", isSelected: false, logo: Share },
];

interface SelectedSpaceSidebarProps {
    onContentSelect: (content: SidebarContentType) => void;
    selectedContent: SidebarContentType | null;
    spaceId: string
}

const SelectedSpaceSidebar: React.FC<SelectedSpaceSidebarProps> = ({ onContentSelect, selectedContent, spaceId }) => {


    return (
        <div className="sticky top-28">

            <ul className="flex flex-col justify-center items-center gap-4 lg:gap-10 px-4 py-4">
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
                {/* <li className="min-w-52 items-center flex flex-row gap-3 hover:bg-purple-700 rounded hover:cursor-pointer">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Code className="h-5 w-5 text-gray-700" />
                                <span className="font-semibold">Use it</span>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[500px] lg:min-w-[700px] bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl border rounded-lg p-6">
                            <DialogHeader>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Embed Code</h2>
                                <p className="text-sm text-gray-600">
                                    Copy the following script and use it to embed your space anywhere.
                                </p>
                            </DialogHeader>

                            <div className="relative overflow-hidden rounded-lg mt-4 shadow-md">
                                <pre
                                    className="overflow-x-auto p-4 py-10 rounded-lg"
                                    style={{
                                        backgroundColor: '#1E293B',
                                    }}
                                >
                                    <code className="text-sm text-gray-200 px-4 ">{urlToCopy}</code>
                                </pre>
                                <div
                                    className="absolute top-2 right-2 bg-gray-900 text-gray-400 text-xs px-2 py-1 rounded"
                                    style={{ fontFamily: 'monospace' }}
                                >
                                    JavaScript
                                </div>
                            </div>

                            <DialogFooter className="mt-6 rounded">
                                <Button
                                    type="submit"
                                    onClick={handleCopy}
                                    className={`bg-customBlue hover:bg-onHoverCustomBlue px-4 py-2 rounded text-white font-semibold flex items-center gap-2 ${copied ? 'bg-green-700 hover:bg-green-900' : ''}`}
                                >
                                    {!copied ? <><Copy className="h-4 w-4" />
                                        Copy Code</> : <><ClipboardCheck className="h-4 w-4" />
                                        Copied</>}

                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </li> */}
            </ul>
        </div>
    );
};

export default SelectedSpaceSidebar;
