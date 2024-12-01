/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import SelectedSpaceTopBar from "@/app/components/selected-space/SelectedSpaceTopBar";
import SelectedSpaceSidebar from "@/app/components/selected-space/SelectedSpaceSidebar";
import { SidebarContentType } from "@/app/components/selected-space/SelectedSpaceSidebar";
import { usePathname } from "next/navigation";
import { Space } from "@/app/components/CreateNewSpace";
import SelectedSpaceRightBox from "@/app/components/selected-space/SelectedSpaceRightBox";
import { User } from "@/app/components/NavbarProfile";
import { WalletCards } from "lucide-react";

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
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const [space, spaceId] = pathSegments;
    const [selectedContent, setSelectedContent] =
        useState<SidebarContentType | null>({
            label: "All",
            isSelected: true,
            logo: WalletCards,
        });
    const [currentSpace, setCurrentSpace] = useState<Space>({
        spaceName: "",
        spaceLogo: "",
        customMessage: "",
        headerTitle: "",
        owner: "",
        _id: "",
        questions: [],
    });
    const [testimonials, setTestimonials] = useState<Testimonial[]>();
    const [filteredTestimonials, setFilteredTestimonials] =
        useState<Testimonial[]>();

    const getAllTestimonials = async (userId: string) => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/testimonial/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, spaceId: spaceId }),
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch testimonials : ${res.statusText}`);
            }
            const data = await res.json();
            setCurrentSpace(data.space);
            setTestimonials(data.testimonials);
            setFilteredTestimonials(data.testimonials); // Directly set all testimonials
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleContentSelection = (content: SidebarContentType) => {
        filterTestimonials(content.label);
        setSelectedContent(content);
    };

    const filterTestimonials = (filterType: string | Testimonial[]) => {
        if (Array.isArray(filterType)) {
            setFilteredTestimonials(filterType); // Set directly when called with an array
        } else if (filterType === "Text") {
            const data = testimonials?.filter(
                (testimonial) => testimonial.testimonialType === "text"
            );
            setFilteredTestimonials(data);
        } else if (filterType === "Video") {
            setFilteredTestimonials(
                testimonials?.filter(
                    (testimonial) => testimonial.testimonialType === "video"
                )
            );
        } else if (filterType === "Liked") {
            const data = testimonials?.filter(
                (testimonial) => testimonial.isLiked === true
            );
            setFilteredTestimonials(data);
        } else {
            setFilteredTestimonials(testimonials); // Default case to show all
        }
    };


    const getUser = async () => {
        const userData = sessionStorage.getItem("userSession");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getAllTestimonials(user.id);
        } else {
            getUser();
        }
    }, [user]);

    return (
        <div className="text-white">
            <div className="mb-28">
                <Navbar />
            </div>
            <div className=" bg-slate-700 w-full" style={{ height: "1.2px" }}></div>
            <SelectedSpaceTopBar
                spaceName={currentSpace.spaceName}
                spaceLogo={currentSpace.spaceLogo}
                textCount={testimonials ? testimonials?.filter(testimonial => testimonial.testimonialType === "text").length : 0}
                videoCount={testimonials ? testimonials.filter(testimonial => testimonial.testimonialType === "video").length : 0}
            />
            <div
                className=" bg-slate-700 w-full sticky top-28"
                style={{ height: "1.2px" }}
            ></div>
            <div className="flex flex-col lg:flex-row lg:h-96 lg:top-16">
                <div className="border-b-2 lg:border-b-0 lg:border-r-2 w-full lg:w-auto ">
                    <SelectedSpaceSidebar
                        onContentSelect={handleContentSelection}
                        selectedContent={selectedContent}
                        spaceId={currentSpace._id}
                    />
                </div>
                <div className=" border-b-2 lg:border-b-0 lg:border-r-2  lg:w-full ">
                    {isLoading ? (
                        <div className="w-full flex flex-col items-center">
                            {/* Skeleton Loader */}
                            <div className="animate-pulse space-y-4 w-3/4">
                                <div className="h-8 bg-gray-600 rounded"></div>
                                <div className="h-6 bg-gray-600 rounded"></div>
                                <div className="h-8 bg-gray-600 rounded"></div>
                            </div>
                        </div>
                    ) : (
                        filteredTestimonials && (
                            <SelectedSpaceRightBox
                                testimonials={filteredTestimonials}
                                userId={user?.id}
                                spaceId={spaceId}
                                sectionType={selectedContent?.label ? selectedContent.label : null}

                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpaceInformation;
