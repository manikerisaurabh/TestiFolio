import { Testimonial } from '@/app/space/[space-name]/page';
import React from 'react';
import TestimonialCard from './TestimonialCard';

interface SelectedSpaceRightBoxProps {
    testimonials: Testimonial[];

}


const SelectedSpaceRightBox: React.FC<SelectedSpaceRightBoxProps> = ({ testimonials }) => {
    console.log({ testimonials })
    return (
        <div className="min-w-16 w-full rounded flex flex-wrap gap-12 p-12 justify-center items-center ">
            {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className="w-[100vh]  flex flex-row justify-center items-center"
                >
                    <div
                        className="w-full bg-slate-600 px-8 py-12 rounded"
                        style={{ backgroundColor: 'rgb(37 40 44)' }}
                    >
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SelectedSpaceRightBox;
