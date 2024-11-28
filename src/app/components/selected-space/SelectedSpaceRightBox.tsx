import { Testimonial } from '@/app/space/[space-name]/page';
import React from 'react';
import TestimonialCard from './TestimonialCard';
import NoTestimonialCard from './NoTestimonialCard';

interface SelectedSpaceRightBoxProps {
    testimonials: Testimonial[];
    userId: string | undefined;
    spaceId: string;
}

const SelectedSpaceRightBox: React.FC<SelectedSpaceRightBoxProps> = ({ testimonials, userId, spaceId }) => {
    return (
        <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-12 lg:mt-96 justify-center items-center">
            {testimonials.length === 0 ? (
                <NoTestimonialCard userId={userId} spaceId={spaceId} />
            ) : (
                <div className="w-full flex flex-col gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="w-full flex flex-col justify-center items-center"
                        >
                            <div className="w-full max-w-4xl bg-gray-800 px-6 py-8 rounded-lg">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectedSpaceRightBox;
