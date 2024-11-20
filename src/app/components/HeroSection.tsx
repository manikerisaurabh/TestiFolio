import React from 'react'
import { lacquer, pacifico } from '../fonts/usedFonts'


const HeroSection = () => {
    return (
        <div className='flex flex-col gap-16 justify-center px-40 min-h-[100vh]'>
            <div className='flex flex-col gap-12'>
                <h1 className={`${lacquer.className} font-extrabold text-6xl text-center`}>Effortlessly gather testimonials from your customers.</h1>
                <p className={`${pacifico.className} text-3xl`}>
                    We understand that collecting testimonials can be challenging. That’s why we created Testimonial – a simple tool that lets you collect text and video testimonials from your customers in just a few minutes, without requiring any coding skills or the need for website hosting.
                </p>
            </div>
            <div className='flex items-center justify-center gap-16'>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">try FREE now</button>
                <button className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900">Talk to us</button>
            </div>
        </div>
    )
}

export default HeroSection