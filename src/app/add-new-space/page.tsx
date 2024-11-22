"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import { ibmPlexSans, robotoSlab } from "../fonts/usedFonts";
import { Trash2 } from "lucide-react";
import { Grip } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { Video } from 'lucide-react';
import { PencilLine } from 'lucide-react';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import defaultImage from '../../../public/logo.png'
import Image from "next/image";
import { User } from "../components/NavbarProfile";
import Navbar from "../components/Navbar";

export interface CloudinaryUploadResponse {
    access_mode: string; // Access mode (e.g., "public")
    asset_id: string; // Unique identifier for the asset
    batchId: string; // Batch ID for the upload
    bytes: number; // File size in bytes
    created_at: string; // Timestamp when the file was created
    etag: string; // ETag for the uploaded file
    folder: string; // Folder where the file is stored
    format: string; // File format (e.g., "png")
    height: number; // Height of the image
    id: string; // File ID
    original_filename: string; // Original filename before upload
    path: string; // Path to the file within Cloudinary
    placeholder: boolean; // Whether the file is a placeholder
    public_id: string; // Public ID for the file
    resource_type: string; // Resource type (e.g., "image")
    secure_url: string; // Secure URL for accessing the file
    signature: string; // Signature for verifying the file upload
    tags: string[]; // Tags associated with the file
    thumbnail_url: string; // URL for the thumbnail version of the file
    type: string; // Upload type (e.g., "upload")
    url: string; // URL for accessing the file
    version: number; // Version number for the file
    version_id: string; // Version ID for the file
    width: number; // Width of the image
}


export interface FormData {
    spaceName: string;
    spaceLogo: string | null;
    headerTitle: string;
    customMessage: string;
    questions: string[];
}

const AddNewSpace = () => {
    const [user, setUser] = useState<User | null>(null);

    const [resource, setResource] = useState<CloudinaryUploadWidgetInfo | string>();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [formData, setFormData] = useState<FormData>({
        spaceName: "",
        spaceLogo: null,
        headerTitle: "",
        customMessage: "",
        questions: ["Who are you / what are you working on", "How has [our product / service] helped you?"],
    });


    useEffect(() => {
        const storedUser = sessionStorage.getItem("userSession");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
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
                    spaceLogo: url,
                }));
            }
        }
    }, [resource]);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const { name, value } = event.target;

        if (name === "questions" && typeof index === "number") {
            const updatedQuestions = [...formData.questions];
            updatedQuestions[index] = value;
            setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    //         if (allowedTypes.includes(file.type)) {
    //             const fileURL = URL.createObjectURL(file);
    //             setImagePreview(fileURL);
    //             // setFormData((prev) => ({ ...prev, spaceLogo: file }));
    //         } else {
    //             alert("Please upload a valid image file (png, jpeg, jpg, or svg).");
    //         }
    //     }
    // };

    const deleteSelectedImage = () => {
        setImagePreview(null);
        setFormData((prev) => ({ ...prev, spaceLogo: null }));
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the input file's value
        }
    };

    const addQuestionField = () => {
        setFormData((prev) => ({
            ...prev,
            questions: [...prev.questions, ""],
        }));
    };

    const removeQuestion = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index),
        }));
    };

    const checkFormValidation = () => {
        if (formData.customMessage == "") {
            console.log("in check form calid")
            toast.error('Custom Message should be enter', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }
    }

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkFormValidation();
        toast.success("wow skdbc")
        try {
            const result = await fetch('/api/add-new-space', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await result.json();
            console.log("Response from server:", data);
            toast.success("Congratulations! New space created successfully")
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };



    return (
        <div className="min-w-[100vh] min-h-[100vh] flex flex-row justify-center px-24 py-32 rounded">
            <Navbar />
            <div className="bg-white min-w-[60%] rounded px-8 py-8 border-r-2">


                <div className="flex flex-col justify-center items-center">
                    <ToastContainer
                    />
                    <h1 className={`${ibmPlexSans.className} text-4xl font-extrabold`}
                        style={{ fontWeight: 900 }}
                    >
                        Create a new Space
                    </h1>
                    <p>
                        After the Space is created, it will generate a dedicated page for
                        collecting testimonials.
                    </p>
                </div>
                <form onSubmit={handleFormSubmit} className="flex flex-col justify-center px-8 py-8">
                    {/* Space Name Input */}
                    <div className="flex flex-col justify-start mb-4">
                        <label htmlFor="spaceName">
                            Space Name <span className="text-red-700 font-bold">*</span>
                        </label>
                        <input
                            type="text"
                            id="spaceName"
                            name="spaceName"
                            placeholder="Enter space name"
                            className="border border-slate-300 px-2 py-2 rounded"
                            value={formData.spaceName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        className="text-slate-500"
                        type="text"
                        readOnly
                        value={`Public url will be : saurabh/${user?.id}/${formData.spaceName.replace(/\s+/g, '-')}`}
                    />

                    {/* File Upload with Image Preview */}
                    <div className="flex flex-col justify-start mb-4">
                        <label htmlFor="spaceLogo">Space Logo</label>
                        <div className="flex items-center gap-4 mt-2">
                            <span
                                className="h-24 w-24 border border-slate-300 rounded-full flex items-center justify-center bg-gray-100"
                            >
                                {formData.spaceLogo ? (
                                    <img
                                        src={formData.spaceLogo}
                                        alt="Selected Space Logo"
                                        className="h-24 w-24 object-contain rounded-full"
                                    />
                                ) : (
                                    <p className="text-center text-sm text-gray-500">
                                        No image selected
                                    </p>
                                )}
                            </span>

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
                                        <button onClick={handleOnClick}>
                                            Upload an Image
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>

                            {/* <input
                                ref={fileInputRef}
                                title="change"
                                type="file"
                                id="spaceLogo"
                                accept=".png, .jpeg, .jpg, .svg"
                                onChange={handleFileChange}
                                className="border border-slate-300 px-2 py-2 rounded cursor-pointer"
                            /> */}
                            {imagePreview && (
                                <button
                                    type="button"
                                    onClick={deleteSelectedImage}
                                    className="p-1 bg-red-500 text-white rounded"
                                >
                                    <Trash2 width={20} height={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Header Title */}
                    <div className="flex flex-col justify-start mb-4">
                        <label htmlFor="headerTitle">Header Title</label>
                        <input
                            type="text"
                            id="headerTitle"
                            name="headerTitle"
                            placeholder="Enter header title"
                            className="border border-slate-300 px-2 py-2 rounded"
                            value={formData.headerTitle}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Custom Message */}
                    <div className="flex flex-col justify-start mb-4">
                        <label htmlFor="customMessage">Your Custom Message</label>
                        <textarea
                            id="customMessage"
                            name="customMessage"
                            placeholder="Enter your custom message"
                            className="border border-slate-300 px-2 py-2 rounded"
                            value={formData.customMessage}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Questions */}
                    <div className="flex flex-col justify-start mb-4">
                        <label htmlFor="questions">Questions</label>
                        {formData.questions.map((question, index) => (
                            <div key={index} className="flex flex-row items-center gap-4">
                                <Grip className="mb-2" height={20} width={20} />
                                <input
                                    key={index}
                                    type="text"
                                    name="questions"
                                    placeholder={`Question ${index + 1}`}
                                    className="border border-slate-300 px-2 py-2 rounded mb-2 w-full"
                                    value={question}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="p-1 rounded"
                                >
                                    <Trash2 height={20} width={20} className="mb-2" />
                                </button>
                            </div>
                        ))}
                        <div className="px-8 pt-4">
                            <button
                                type="button"
                                onClick={addQuestionField}
                                className="flex flex-row gap-3 items-center"
                            >
                                <CirclePlus height={15} width={15} />
                                <span>Add Question</span>
                            </button>
                        </div>

                    </div>
                    <div className="flex items-center justify-center rounded hover:text-white "
                        style={{ backgroundColor: 'rgb(93 93 255/var(--tw-bg-opacity))' }}
                    >

                        <button className=" px-2 py-2 font-bold text-1xl w-[50%]" type="submit">Create new Space</button>
                    </div>
                </form>
            </div>
            <div className="bg-white min-w-[40%] rounded px-4 border-l-2">
                <div
                    className=" sticky max-w-48 rounded flex items-center justify-center py-1 mt-10"
                    style={{
                        backgroundColor: 'rgb(167 243 208)',
                        color: 'rgb(5 150 105)',
                        borderRadius: '20px',
                    }}
                >
                    <p className="font-bold items-center">Live Preview</p>
                </div>

                <div className="flex flex-col px-8 py-16 justify-center border border-slate-400 rounded">
                    {/* Logo Preview */}
                    <div className="flex justify-center items-center mb-4">
                        {formData.spaceLogo ? (

                            <img
                                src={formData.spaceLogo}
                                alt="Selected Space Logo"
                                className="h-24 w-24 object-contain rounded-full"
                            />
                        ) : (
                            <Image src={defaultImage} height={80} width={80} alt="Default Space Logo" />
                        )}
                    </div>

                    {/* Header Title Preview */}
                    <div className="mb-4">
                        <h1 className={`${robotoSlab.className} text-2xl font-extrabold text-center`}
                            style={{ color: 'rgb(70 89 120)', fontWeight: 'bolder' }}
                        >
                            {formData.headerTitle || 'Header goes here...'}
                        </h1>
                    </div>

                    {/* Custom Message Preview */}
                    <div className="mb-4">
                        <h2 className="text-center text-gray-600"
                            style={{ color: 'rgb(112 125 134)' }}
                        >
                            {formData.customMessage || 'Your custom message goes here...'}
                        </h2>
                    </div>

                    {/* Questions Preview */}
                    <div className="px-4 flex gap-2 flex-col min-h-64">
                        <h3 className="font-bold text-lg mb-2"
                            style={{ color: 'rgb(85 89 95)', fontWeight: 'bolder' }}
                        >QUESTIONS</h3>
                        <div className="min-w-3 max-w-12 bg-black h-2 ml-1"
                            style={{ backgroundColor: 'rgb(93, 93, 255)' }}
                        ></div>
                        <ul className="list-disc list-inside space-y-2">
                            {formData.questions.map((question, index) => (
                                <li key={index} className="text-gray-700 text-xl font-medium"
                                    style={{ color: 'rgb(112 125 134)' }}
                                >
                                    {question || `Question ${index + 1}`}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col px-10 gap-2">
                        <button className="px-2 py-2 rounded flex flex-row items-center justify-center gap-2 text-white"
                            style={{ backgroundColor: 'rgb(93, 93, 255)', fontWeight: 700 }}
                        > <Video /> Record a video</button>
                        <button className="px-2 py-2 rounded flex flex-row items-center justify-center gap-6 text-white"
                            style={{ backgroundColor: 'rgb(51 54 58)', fontWeight: 700 }}
                        > <PencilLine /> Send a text</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddNewSpace;
