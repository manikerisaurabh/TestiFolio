import { Testimonial } from '@/app/space/[space-name]/page';
import { Heart } from 'lucide-react';
import React from 'react';
import StarRatings from 'react-star-ratings';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {

    const addToLike = async () => {
        try {
            const response = await fetch('/api/testimonial/add-to-liked', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: testimonial._id }),
            });
            if (!response.ok) {
                console.log("error  while adding into liked")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Text and Heart Icon */}
            <div className="flex justify-between items-center">
                <span className="text-white font-medium">Text</span>
                <button
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                    aria-label="Like Testimonial"
                    onClick={addToLike}
                >
                    {testimonial.isLiked == true ? <Heart fill='red' /> : <Heart />}

                </button>
            </div>

            {/* Star Ratings */}
            <div>
                <StarRatings
                    rating={parseInt(testimonial.rating)}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="3px"
                />
                <h3>{testimonial.message}</h3>
                <div className='flex justify-center items-center'>
                    {testimonial.imageUrl && (
                        <img src={testimonial.imageUrl} alt="image" className='items-center' height={250} width={250} />
                    )}
                </div>
                <div className="flex flex-col sm:flex-row lg:gap-46 items-center justify-between gap-4">
                    <div>
                        <h2>Name</h2>
                        <span>{testimonial.userName}</span>
                        {testimonial.userImage && (
                            <img
                                src={testimonial.userImage}
                                alt="user image"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <h2>Email</h2>
                        <span>{testimonial.userEmail}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
