"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import appLogo from "../../../../public/logo.png";
import { PencilLine, Video } from "lucide-react";
import StarRatings from "react-star-ratings";



import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { CloudinaryUploadResponse } from "@/app/add-new-space/page";

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

interface FormData {
    message: string;
    imageUrl: string;
    rating: number;
    userName: string;
    userEmail: string;
    userImage: string;
    permissionToShare: boolean;
    spaceName: string;
    testimonialType: string
}
const WriteNewTestimonial = () => {

    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);
    const [userId, rawSpaceName] = pathSegments;
    const spaceName = rawSpaceName.replace(/-/g, " ");
    const [spaceInfo, setSpaceInfo] = useState<Space>();
    const [resource, setResource] = useState<CloudinaryUploadWidgetInfo | string>();
    const [userResource, setUserResource] = useState<CloudinaryUploadWidgetInfo | string>();
    const [showAdd, setshowAdd] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [formData, setFormData] = useState<FormData>({
        message: "",
        imageUrl: "",
        rating: 5,
        userName: "",
        userEmail: "",
        userImage: "",
        permissionToShare: false,
        spaceName: spaceName,
        testimonialType: "text"
    });
    // Fetch space information
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
            console.error("Error fetching space info:", error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
        console.log(name)
        console.log(value)
        console.log(type)
        if (type === "checkbox") {
            const { checked } = event.target as HTMLInputElement; // Explicit cast
            console.log(checked)
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        getSpaceInfo();
    }, []);

    useEffect(() => {
        // Ensure resource is of type CloudinaryUploadResponse
        if (resource && typeof resource === "object") {
            const d = resource as unknown as CloudinaryUploadResponse; // Explicit type assertion
            if (d.secure_url) {
                console.log('this is d ', d.secure_url);
                const url: string = d.secure_url;

                setFormData((prev) => ({
                    ...prev,
                    imageUrl: url
                }));
            }
        }
    }, [resource]);


    useEffect(() => {
        // Ensure resource is of type CloudinaryUploadResponse
        if (userResource && typeof userResource === "object") {
            const d = userResource as unknown as CloudinaryUploadResponse; // Explicit type assertion
            if (d.secure_url) {
                const url: string = d.secure_url;

                setFormData((prev) => ({
                    ...prev,
                    userImage: url,
                }));
            }
        }
    }, [userResource]);


    // Update rating value
    const changeRating = (newRating: number) => {
        setFormData((prev) => ({
            ...prev,
            rating: newRating
        }))

    };

    const handleBtnClick = () => {
        setshowAdd(true)
    }

    const handleSubmiteTestimonial = async () => {
        console.log('this is formdata :', formData)
        try {
            setIsLoading(true)
            const response = await fetch('/api/testimonial/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();
            console.log({ data })

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className="flex flex-col min-h-screen px-4 py-6 bg-white items-center"
            style={{ backgroundColor: "white" }}
        >
            {/* Header */}
            <div className="flex flex-row justify-start items-center fixed left-0 gap-4 w-full max-w-6xl">
                <Image src={appLogo} height={60} width={60} alt="App Logo" />
                <strong className="text-slate-600 text-3xl md:text-4xl">TestiFolio</strong>
            </div>

            {/* Main Content */}
            {showAdd == false ?
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
                                        {question}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4 w-full">
                        <button
                            className="w-full py-3 text-xl md:text-xl rounded flex items-center justify-center gap-3 text-white font-bold hover:bg-blue-700"
                            style={{ backgroundColor: "rgb(93 93 255)" }}
                        >
                            <Video size={24} /> Record a video
                        </button>

                        <button
                            className="w-full py-3 text-xl md:text-xl   rounded flex items-center justify-center gap-3 text-white bg-gray-800 hover:bg-gray-950 font-bold"
                            onClick={handleBtnClick}
                        >
                            <PencilLine size={24} /> Send a text



                        </button>
                    </div>
                </div>
                :
                <div className="border rounded px-12 py-10 mt-12 shadow-lg"
                    style={{ boxShadow: '5px 8px 12px 12px rgba(0, 0, 0, 0.25)', borderRadius: '20px' }}
                >
                    <div className=" flex flex-col gap-4 sm:max-w-[425px] bg-white text-black rounded" style={{ borderRadius: '10px' }}>
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-bold">Write a testimonial for {spaceInfo?.headerTitle}</h2>
                            <img src={spaceInfo?.spaceLogo} alt="app-logo" height="80" width="80" />
                        </div>

                        <div className="w-full">
                            <h3 className="font-bold text-2xl text-gray-700 mb-4">QUESTIONS</h3>
                            <ul className="list-disc list-inside text-sm md:text-base">
                                {spaceInfo &&
                                    spaceInfo.questions.map((question, index) => (
                                        <li key={index} className="text-gray-600">
                                            {question}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        <div className="flex flex-1 flex-col">
                            <StarRatings
                                rating={formData.rating}
                                starRatedColor="gold"
                                changeRating={changeRating}
                                numberOfStars={5}
                                starDimension="30px"
                                starSpacing="5px"
                                name="rating"
                            />
                            <textarea
                                className="border border-slate-600 rounded mt-4 p-2"
                                rows={4}
                                placeholder="Write your thoughts..."
                                value={formData?.message}
                                name="message"
                                onChange={handleInputChange}
                            ></textarea>
                            <div className="flex flex-row gap-4 mt-6 justify-between">
                                <div className="flex flex-col gap-6">


                                    <label htmlFor="" className="text-gray-600">Attach Image</label>
                                    <CldUploadWidget
                                        uploadPreset="testi_folio"
                                        onSuccess={(result) => {
                                            if (result.info) {
                                                console.log('this is result info ', result.info)
                                                setResource(result?.info);

                                            }
                                        }}
                                        onQueuesEnd={(result, { widget }) => {
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => {
                                            function handleOnClick() {
                                                setResource(undefined);
                                                open();
                                            }
                                            return (
                                                <button className="border text-gray-600 rounded px-1 py-1 w-[100%] hover:text-gray-800 font-semibold
                                            " onClick={handleOnClick}

                                                >
                                                    Choose File
                                                </button>
                                            );
                                        }}
                                    </CldUploadWidget>
                                </div>
                                <div>

                                    {formData?.imageUrl && <img src={formData.imageUrl} alt="ds" height={50} width={50} />}
                                </div>
                            </div>


                            <div className="mt-4">
                                <label htmlFor="userName" className="text-gray-600">Your Name <span className="text-red-600 font-bold">*</span></label>
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    className="border border-slate-700 rounded w-full mt-2 p-2"
                                    value={formData?.userName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="userEmail" className="text-gray-600">Your Email <span className="text-red-600 font-bold">*</span></label>
                                <input
                                    id="userEmail"
                                    type="email"
                                    name="userEmail"
                                    className="border border-slate-700 rounded w-full mt-2 p-2"
                                    value={formData?.userEmail}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mt-4 flex flex-col gap-4">
                                <label htmlFor="userImage" className="text-gray-600">Upload Your Image</label>
                                <div className="flex flex-row items-center gap-4 mt-2">
                                    <div className="min-h-16 min-w-16 rounded-full flex items-center justify-center">
                                        {formData?.userImage ? (
                                            <img
                                                src={formData.userImage}
                                                alt="user"
                                                className="rounded-full h-16 w-16 object-cover"
                                            />
                                        ) : (
                                            <span className="min-h-16 min-w-16 bg-slate-400"
                                                style={{ borderRadius: '50%' }}></span>
                                        )}
                                    </div>
                                    <CldUploadWidget
                                        uploadPreset="testi_folio"
                                        onSuccess={(result) => {
                                            if (result.info) {
                                                console.log('this is result info ', result.info)
                                                setUserResource(result?.info);

                                            }
                                        }}
                                        onQueuesEnd={(result, { widget }) => {
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => {
                                            function handleOnClick() {
                                                setUserResource(undefined);
                                                open();
                                            }
                                            return (
                                                <button className="border text-gray-600 rounded px-1 py-1 w-[30%] hover:text-gray-800 font-semibold" onClick={handleOnClick}>
                                                    Choose File
                                                </button>
                                            );
                                        }}
                                    </CldUploadWidget>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <input type="checkbox" onChange={handleInputChange} name="permissionToShare" id="" />
                                    <span className="text-gray-600">I give permission to use this testimonial across social channels and other marketing efforts
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center items-end justify-end flex flex-row gap-5">
                            <button
                                className="border text-gray-600 rounded px-3 py-1 hover:text-gray-800 font-semibold hover:bg-gray-300"
                                onClick={() => { setshowAdd(false) }}>
                                Cancel
                            </button>
                            {/* <button className=" text-white px-3 py-1 rounded"
                                style={{ backgroundColor: 'rgb(93 93 255)' }}
                                onClick={handleSubmiteTestimonial}
                            >
                                Send
                            </button> */}

                            <button
                                disabled={isLoading}
                                onClick={handleSubmiteTestimonial}
                                type="submit"
                                className={`relative rounded px-3 py-1  font-bold text-1xl border  text-gray-600 hover:text-gray-800 hover:bg-gray-300  transition-all
        ${isLoading ? 'cursor-not-allowed ' : ''}`}
                            >

                                {isLoading && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-opacity-50"
                                    >
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <span className={`${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    Send
                                </span>
                            </button>

                        </div>
                    </div>
                </div>

            }

        </div>
    );
};

export default WriteNewTestimonial; 