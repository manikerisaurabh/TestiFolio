import { revalidatePath } from 'next/cache'; // Import revalidatePath

import { Testimonial } from '@/app/space/[space-name]/page';
import { Heart } from 'lucide-react';
import React from 'react';
import StarRatings from 'react-star-ratings';
import { Bounce, toast, ToastContainer } from 'react-toastify';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    const addToLike = async (isLiked: boolean) => {
        try {
            const response = await fetch('/api/testimonial/add-to-liked', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: testimonial._id }),
            });
            if (!response.ok) {
                console.log('Error while adding into liked');
            } else {
                if (!isLiked) {
                    toast.success('Testimonial added to liked', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {
                    toast.warn('Testimonial removed from liked', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                    // revalidatePath(`/space/${testimonial.spaceId}`);
                }, 500);
            }
            setTimeout(() => {
                revalidatePath(`/space/${testimonial.spaceId}`);
            }, 500);


        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <ToastContainer />
            <div className="flex justify-between items-center">
                <span className="text-white font-medium text-sm sm:text-base">
                    Testimonial
                </span>
                <button
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                    aria-label="Like Testimonial"
                    onClick={() => { addToLike(testimonial.isLiked) }}
                >
                    {testimonial.isLiked ? <Heart fill="red" /> : <Heart />}
                </button>
            </div>

            {/* Rating and Message */}
            <div>
                <StarRatings
                    rating={parseInt(testimonial.rating)}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="3px"
                />
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                    {testimonial.message}
                </p>
            </div>

            {/* Image Section */}
            {testimonial.imageUrl && (
                <div className="flex justify-center mt-4">
                    <img
                        src={testimonial.imageUrl}
                        alt="Testimonial"
                        className="max-w-full h-auto rounded-lg"
                        style={{ maxHeight: '200px' }}
                    />
                </div>
            )}

            {/* User Details */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex items-center gap-4">
                    {testimonial.userImage && (
                        <img
                            src={testimonial.userImage}
                            alt="User"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <h3 className="text-white text-sm sm:text-base">Name</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            {testimonial.userName}
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-white text-sm sm:text-base">Email</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                        {testimonial.userEmail}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
