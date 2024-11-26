/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import SelectedSpaceTopBar from "@/app/components/selected-space/SelectedSpaceTopBar";
import SelectedSpaceSidebar from "@/app/components/selected-space/SelectedSpaceSidebar";
import { SidebarContentType } from "@/app/components/selected-space/SelectedSpaceSidebar"; // Ensure this is exported
import { ClientSideUserContext } from "@/context/ClientSideUserProvider";
import { usePathname } from 'next/navigation'
import { Space } from "@/app/components/CreateNewSpace";
import SelectedSpaceRightBox from "@/app/components/selected-space/SelectedSpaceRightBox";



export interface Testimonial {
    imageUrl: string;
    message: string;
    permissionToShare: boolean;
    rating: string;
    spaceId: string;
    userEmail: string;
    userImage: string;
    userName: string;
    _id: string;
    isLiked: boolean;
    testimonialType: string;
}


const SpaceInformation: React.FC = () => {
    const clientSideUserContext = useContext(ClientSideUserContext);
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const [space, spaceId] = pathSegments;
    const [selectedContent, setSelectedContent] = useState<SidebarContentType | null>(null);
    const [currentSpace, setCurrentSpace] = useState<Space>({
        spaceName: '',
        spaceLogo: '',
        customMessage: '',
        headerTitle: '',
        owner: '',
        _id: '',
        questions: []
    });
    const [testimonials, setTestimonials] = useState<Testimonial[]>()
    const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>()
    // Ensure context exists before accessing its properties
    if (!clientSideUserContext) {
        return <div>Error: User context not available.</div>;
    }

    const { user } = clientSideUserContext;



    const getAllTestimonials = async () => {
        try {
            const res = await fetch(`/api/testimonial/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user?.id, spaceId: spaceId }),
                cache: 'no-store', // Ensures it fetches fresh data each time
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch testimonials : ${res.statusText}`);
            }
            const data = await res.json();
            console.log(data)
            setCurrentSpace(data.space);
            setTestimonials(data.testimonials)

        } catch (error) {
            console.error('Error fetching spaces:', error);
            return [];
        }
    };

    const handleContentSelection = (content: SidebarContentType) => {
        filterTestimonials(content.label)
        setSelectedContent(content);
    };

    const filterTestimonials = (filterType: string) => {
        console.log({ filterType })
        if (filterType === "Text") {
            const data = testimonials?.filter((testimonial) => testimonial.testimonialType == "text");
            setFilteredTestimonials(data);
        } else if (filterType === "Video") {
            setFilteredTestimonials(testimonials?.filter((testimonial) => testimonial.testimonialType == "video"));
        } else if (filterType === "Liked") {
            const data = (testimonials?.filter(testimonial => testimonial.isLiked == true));
            setFilteredTestimonials(data);
        } else {
            setFilteredTestimonials(testimonials);
        }
    };


    // if (!selectedSpace) {
    //     return <div>No space selected.</div>;
    // }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (user) {
            console.log({ user })
            console.log(user.id);
            getAllTestimonials();
        } else {
            console.log("No user found in session.");
        }
    }, [user]);

    useEffect(() => {
        console.log({ currentSpace });
        console.log(testimonials)
    }, [testimonials])





    return (
        <div className="text-white">
            <div className="mb-28">
                <Navbar />
            </div>
            <div
                className=" bg-slate-700 w-full"
                style={{ height: "1.2px" }}
            ></div>
            <SelectedSpaceTopBar
                spaceName={currentSpace.spaceName}
                spaceLogo={currentSpace.spaceLogo}
                textCount={4}
                videoCount={5}
            />
            <div
                className=" bg-slate-700 w-full sticky top-28"
                style={{ height: "1.2px" }}
            ></div>
            <div className="flex flex-row h-96 sticky top-16 ">
                <div>                    <SelectedSpaceSidebar
                    onContentSelect={handleContentSelection}
                    selectedContent={selectedContent}
                />
                    {selectedContent?.label}
                </div>
                <div
                    className=" bg-slate-700 w-full sticky top-32"
                    style={{ width: "1.2px" }}
                ></div>
                <div>
                    {filteredTestimonials &&
                        <>
                            {filterTestimonials.length > 0 ?
                                <SelectedSpaceRightBox testimonials={filteredTestimonials} />
                                :
                                <span className="text-white">no testimonial found</span>
                            }
                        </>
                    }

                </div>
            </div>
        </div >
    );
};

export default SpaceInformation;
