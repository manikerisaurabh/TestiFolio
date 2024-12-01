import React from "react";
import PricingTable from "../components/PricingTable"; // Ensure this path matches your file structure
import Navbar from "../components/Navbar";

interface PricingPlan {
    name: string;
    price: number;
    features: string[];
    colorClass: string;
    buttonClass: string;
    hoverClass: string;
    isHighlighted: boolean;
}

export default function Home() {
    const pricingPlans: PricingPlan[] = [
        {
            name: "Stater",
            price: 10,
            features: [
                "2 Space",
                "5 Video testimonials",
                "20 Text testimonials",
                "1min response time",
            ],
            colorClass: "text-blue-600",
            buttonClass: "bg-blue-600",
            hoverClass: "bg-blue-700",
            isHighlighted: true,
        },
        {
            name: "Advanced",
            price: 50,
            features: [
                "5 Space",
                "10 Video Testimonials",
                "50 Text Testimonials",
                "30sec response time",
                "Auto spam testimonial detection"
            ],
            colorClass: "text-yellow-500",
            buttonClass: "bg-yellow-500",
            hoverClass: "bg-yellow-600",
            isHighlighted: false,
        },
        {
            name: "Premium",
            price: 100,
            features: [
                "10 Spaces",
                "15 Video Testimonials",
                "100 Text Testimonials",
                "10sec response time",
                "Auto spam testimonial detection"
            ],
            colorClass: "text-green-600",
            buttonClass: "bg-green-600",
            hoverClass: "bg-green-700",
            isHighlighted: false,
        },
    ];

    return (
        <div className="bg-black">
            <Navbar />
            <PricingTable plans={pricingPlans} />
        </div>
    );
}
