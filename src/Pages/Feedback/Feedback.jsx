import React, { useState } from 'react';
import Container from '../Shared/Container';
import { Separator } from "@/components/ui/separator";
import { Rating, Star } from '@smastrom/react-rating';
import toast from 'react-hot-toast';
import { useCreateTestimonialMutation } from '@/redux/features/testimonials/testimonialsApi';
import { useNavigate } from 'react-router-dom';
import FeedbackTipProjectDetails from '@/components/FeedbackTipProjectDetails/FeedbackTipProjectDetails';

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [createFeedback] = useCreateTestimonialMutation();
    const navigate = useNavigate();

    const handleFeedbackChange = (e) => {
        setFeedbackText(e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSendFeedback = async () => {
        const orderId = "8c7d7dcc-a992-4f24-8fa8-8e55adf62be7";
        const customerId = "7576cfce-57e4-40a5-907e-3d8583615099";

        if (rating === 0 || feedbackText === "") {
            return toast.error("Opps!");
        }

        const commonBody = {
            feedback: feedbackText,
            rating,
            orderId,
            customerId
        };

        const body = isChecked ? { ...commonBody, image: "image.com" } : commonBody;

        const res = await createFeedback(body);

        if(res?.data?.status === 200) {
            navigate('/tip')
        }
    };

    const myStyles = {
        itemShapes: Star,
        activeFillColor: '#1781CB',
        inactiveFillColor: '#C8E3F6',
    }

    return (
        <div className='my-10'>
            <Container>
                <div className='grid grid-cols-3 gap-20'>
                    <div className='col-span-2'>
                        <h2 className='font-semibold text-3xl'>Public Feedback</h2>
                        <p className='font-normal text-lg mt-3'>Please share your valuable experience with this project.</p>

                        <Separator className="mt-8" />

                        <div className='flex justify-center items-center my-10'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={rating}
                                onChange={setRating}
                                itemStyles={myStyles}
                                isRequired
                            />
                        </div>

                        <div className='grid grid-cols-5 gap-3'>
                            <div className='col-span-4'>
                                <textarea
                                    className='w-full h-[130px] border p-2'
                                    placeholder='Type your experience'
                                    value={feedbackText}
                                    onChange={handleFeedbackChange}
                                />

                                <div className='text-center mt-5'>
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 font-semibold rounded"
                                        onClick={handleSendFeedback}
                                    >
                                        Send Feedback
                                    </button>
                                </div>
                            </div>

                            <div className='col-span-1'>
                                <p className='text-sm font-medium ml-2'>Add your review</p>

                                <div className='relative'>
                                    <img className='border w-full h-[105px] object-cover mt-1' src="" alt="" />

                                    <div className='absolute bottom-0 right-0 mr-2'>
                                        <input
                                            type="checkbox"
                                            id="reviewCheckbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                </div>

                                <div className='text-end mt-8'>
                                    <button onClick={() => navigate('/tip')} className='font-medium'>Skip</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <FeedbackTipProjectDetails />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Feedback;