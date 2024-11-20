"use client";

import React, { useState, useRef, FormEvent } from "react";
import { funnelDisplay } from "../fonts/usedFonts";
import { Trash2 } from "lucide-react";
import { Grip } from 'lucide-react';
import { CirclePlus } from 'lucide-react';


interface FormData {
    spaceName: string;
    spaceLogo: string | null;
    headerTitle: string;
    customMessage: string;
    questions: string[];
}

const AddNewSpace = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [formData, setFormData] = useState<FormData>({
        spaceName: "",
        spaceLogo: null,
        headerTitle: "",
        customMessage: "",
        questions: [""],
    });

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
            if (allowedTypes.includes(file.type)) {
                const fileURL = URL.createObjectURL(file);
                setImagePreview(fileURL);
                setFormData((prev) => ({ ...prev, spaceLogo: file.name }));
            } else {
                alert("Please upload a valid image file (png, jpeg, jpg, or svg).");
            }
        }
    };

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


    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('this is form data : ', formData)
    }

    return (
        <div className="min-w-[100vh] min-h-[100vh] flex flex-row justify-center px-24 py-24 rounded">
            <div className="bg-white min-w-[70%] rounded px-8">
                <div className="flex flex-col justify-center items-center">
                    <h1 className={`${funnelDisplay.className} text-4xl font-bold`}>
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

                    {/* File Upload with Image Preview */}
                    <div className="flex flex-col justify-start mb-4">
                        <label htmlFor="spaceLogo">Space Logo</label>
                        <div className="flex items-center gap-4 mt-2">
                            <span
                                className="h-24 w-24 border border-slate-300 rounded-full flex items-center justify-center bg-gray-100"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Selected Space Logo"
                                        className="h-full w-full object-contain rounded-full"
                                    />
                                ) : (
                                    <p className="text-center text-sm text-gray-500">
                                        No image selected
                                    </p>
                                )}
                            </span>
                            <input
                                ref={fileInputRef}
                                title="change"
                                type="file"
                                id="spaceLogo"
                                accept=".png, .jpeg, .jpg, .svg"
                                onChange={handleFileChange}
                                className="border border-slate-300 px-2 py-2 rounded cursor-pointer"
                            />
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
            <div className="bg-slate-600 min-w-[30%] rounded"></div>
        </div>
    );
};

export default AddNewSpace;
