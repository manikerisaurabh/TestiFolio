"use client";

import React from "react";

import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";


import dashboard from '../../../public/dashboard.png';
import overview from '../../../public/overview.png';
import personalSpace from '../../../public/personalSpace.png';
import createSpace from '../../../public/createSpace.png';
import embed from '../../../public/embed.png';
import testimonial from '../../../public/testimonial.png';




export default function ThreeDCardDemo() {
    return (
        <div className="flex flex-row px-12 mt-10">
            <Navbar />
            <div className="flex flex-row flex-wrap justify-between h-96">


                <FeatureCard
                    heading="Dashboard Customization"
                    subheading="Effortlessly tailor your dashboard to suit your workflow."
                    image={dashboard}
                />
                <FeatureCard
                    heading="Overview Analytics"
                    subheading="Get a complete overview of your metrics and performance."
                    image={overview}
                />
                <FeatureCard
                    heading="Personalized Space"
                    subheading="Create a space that's truly your own with personalized options."
                    image={personalSpace}
                />
                <FeatureCard
                    heading="Creative Workspace"
                    subheading="Unlock your creativity with tools to design your workspace."
                    image={createSpace}
                />
                <FeatureCard
                    heading="Embed Features"
                    subheading="Easily embed and integrate tools into your workflow."
                    image={embed}
                />
                <FeatureCard
                    heading="User Testimonials"
                    subheading="Hear from users who have experienced the difference."
                    image={testimonial}
                />

            </div>
        </div>
    );
}
