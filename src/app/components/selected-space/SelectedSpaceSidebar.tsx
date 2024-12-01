import React, { useState } from "react";
import { Heart, LucideProps, MessageSquareMore, Video, WalletCards, Code, Copy, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,

} from "@/components/ui/dialog";
import { Bounce, ToastContainer, toast } from "react-toastify";
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
    { label: "Wall of Love", isSelected: false, logo: Code },
];

interface SelectedSpaceSidebarProps {
    onContentSelect: (content: SidebarContentType) => void;
    selectedContent: SidebarContentType | null;
    spaceId: string
}

const SelectedSpaceSidebar: React.FC<SelectedSpaceSidebarProps> = ({ onContentSelect, selectedContent, spaceId }) => {
    const urlToCopy = `<script type="text/javascript" src="${process.env.NEXT_PUBLIC_APP_URL}/api/embed?spaceId=${spaceId}&theme=dark" crossorigin="anonymous"></script>`;
    const [copied, setCopied] = useState<boolean>(false)
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(urlToCopy);
            toast.success('Code copied to clipboard!', {
                position: "top-right", // Position the toast
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark", // Theme of the toast
                transition: Bounce, // Animation transition
            });
            setCopied(true);

            setTimeout(() => {
                setCopied(false)
            }, 5000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className="sticky top-28">
            <ToastContainer />
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
                <li className="min-w-52 items-center flex flex-row gap-3 hover:bg-purple-700 rounded hover:cursor-pointer">
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

                </li>
            </ul>
        </div>
    );
};

export default SelectedSpaceSidebar;
