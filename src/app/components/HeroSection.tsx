import React from 'react';
import { lacquer, pacifico } from '../fonts/usedFonts';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <div className="flex flex-col gap-8 justify-center px-4 sm:px-12 md:px-20 lg:px-40 min-h-screen">
            <div className="flex flex-col gap-6 text-center">
                <h1
                    className={`${lacquer.className} font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl`}
                >
                    Effortlessly gather testimonials from your customers.
                </h1>
                <p className={`${pacifico.className} text-lg sm:text-xl md:text-2xl`}>
                    We understand that collecting testimonials can be challenging. That’s
                    why we created Testimonial – a simple tool that lets you collect text
                    and video testimonials from your customers in just a few minutes,
                    without requiring any coding skills or the need for website hosting.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                    href={'/dashboard'}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Try FREE now
                </Link>
                <button
                    disabled={true}
                    className="px-4 py-2 bg-slate-700 text-white rounded opacity-50 backdrop-blur-sm cursor-not-allowed hover:bg-slate-700"
                >
                    Talk to us
                </button>

            </div>
        </div>
    );
};

export default HeroSection;
