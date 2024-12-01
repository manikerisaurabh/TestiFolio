"use client"
import { Testimonial } from '@/app/space/[space-name]/page';
import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import NoTestimonialCard from './NoTestimonialCard';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import { Copy, ClipboardCheck } from 'lucide-react';
import { Bounce, toast } from 'react-toastify';


interface SelectedSpaceRightBoxProps {
    testimonials: Testimonial[];
    userId: string | undefined;
    spaceId: string;
    sectionType: string | null;
}

const SelectedSpaceRightBox: React.FC<SelectedSpaceRightBoxProps> = ({ testimonials, userId, spaceId, sectionType }) => {
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
        <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:pt-12 justify-center items-center relative">
            {/* Show the button at the top right if sectionType exists */}
            {sectionType === "Liked" && (
                <div className="absolute top-4 right-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='rounded py-2 px-4 bg-purple-700 hover:bg-purple-800'>
                                <span className="font-bold ">Embed these testimonials</span>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[500px] lg:min-w-[500px] bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl border rounded-lg p-6">
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
                </div>
            )}

            {/* Render testimonials or no testimonial card */}
            {testimonials.length === 0 ? (
                <NoTestimonialCard userId={userId} spaceId={spaceId} />
            ) : (
                <div className="w-full flex flex-col gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="w-full flex flex-col justify-center items-center"
                        >
                            <div className="w-full max-w-4xl bg-gray-800 px-6 py-8 rounded">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectedSpaceRightBox;
