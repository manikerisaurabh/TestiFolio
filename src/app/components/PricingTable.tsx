import React from "react";
import { Lock } from "lucide-react";
import { CircleCheck } from 'lucide-react';


interface PricingPlan {
    name: string;
    price: number;
    features: string[];
    colorClass: string;
    buttonClass: string;
    hoverClass: string;
    isHighlighted: boolean;
}

interface PricingTableProps {
    plans: PricingPlan[];
}

const PricingTable: React.FC<PricingTableProps> = ({ plans }) => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-black mt-16" >
            <div className="w-full max-w-6xl mx-auto py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-10"

                >
                    <span className="font-extrabold text-7xl" style={{ color: 'rgb(93 93 255)' }}>TestiFolio</span>

                </h2>

                <p className="text-center text-gray-600 mb-8 text-2xl">
                    Effortlessly gather testimonials from your customers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded shadow-lg p-6 text-center ${plan.isHighlighted ? "border-2 border-yellow-500" : ""
                                }`}
                        >

                            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                            <p className={`text-4xl font-bold mb-6 ${plan.colorClass}`}>
                                ${plan.price}<span className="text-lg">/month</span>
                            </p>
                            <ul className="text-gray-700 space-y-3">
                                {plan.features.map((feature, idx) => (

                                    <li key={idx} className="flex flex-row gap-3">  <CircleCheck color="green" /><span className="font-semibold">{feature}</span></li>
                                ))}
                            </ul>
                            <button
                                className={`${plan.buttonClass} text-white py-2 px-4 mt-16 rounded-full hover:${plan.hoverClass}`}
                            >
                                Buy Now
                            </button>

                            {/* Add Lock Overlay for Last Two Cards */}
                            {index > 0 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                    <Lock className="text-white" size={48} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingTable;
