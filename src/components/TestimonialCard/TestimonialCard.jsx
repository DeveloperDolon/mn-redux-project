import React, { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Rating, Star } from '@smastrom/react-rating';
import UserImg from '../../assets/user.png';

const TestimonialCard = ({ testimonial, isPadding }) => {
    const [timeDifference, setTimeDifference] = useState(null);

    useEffect(() => {
        if (testimonial?.updatedAt) {
            const updatedAtDate = new Date(testimonial.updatedAt);
            const currentDate = new Date();
            const diffInMilliseconds = currentDate - updatedAtDate;

            // Calculate days, hours, minutes, seconds from milliseconds
            const days = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
            const hours = Math.floor((diffInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((diffInMilliseconds % (60 * 1000)) / 1000);

            // Choose the appropriate unit (days, hours, minutes, or seconds) to display
            if (days > 0) {
                setTimeDifference(`${days} days ago`);
            } else if (hours > 0) {
                setTimeDifference(`${hours} hours ago`);
            } else if (minutes > 0) {
                setTimeDifference(`${minutes} minutes ago`);
            } else {
                setTimeDifference(`${seconds} seconds ago`);
            }
        }
    }, [testimonial]);

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#1781CB',
        inactiveFillColor: '#C8E3F6'
    };

    return (
        <div className={`${isPadding ? "px-5" : ""}`}>
            <Separator className="my-4" />

            <div className='flex justify-between items-center gap-5'>
                <p className='text-lg'>“{testimonial?.feedback}”</p>
                <img className='w-24 h-20 border object-cover' src={testimonial?.image} alt="" />
            </div>

            <div className='flex justify-between items-center mt-5'>
                <div className='flex justify-between items-center gap-8'>
                    <img className='w-9 h-9 object-cover rounded-full' src={testimonial?.customer?.image || UserImg} alt="" />
                    <h3 className='font-bold text-lg'>{testimonial?.customer?.userName}</h3>
                    <Rating
                        style={{ maxWidth: 120 }}
                        value={testimonial?.rating}
                        itemStyles={myStyles}
                        readOnly
                    />
                    <p>{testimonial?.customer?.country || "Country"}</p>
                </div>
                <p className='text-sm'>{timeDifference}</p>
            </div>
        </div>
    );
};

export default TestimonialCard;
